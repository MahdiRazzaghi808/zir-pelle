"use client";

import React, { useState, useMemo, ChangeEvent, useLayoutEffect, useRef, useEffect } from "react";
import { Input } from "@/components/atoms/input";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/atoms/popover";
import { Icon } from "@/components/atoms/icon";
import { cn } from "@/utils/cn";
import { provinces } from "@/data/provinces";
import { cites } from "@/data/cites";
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
} from "@/components/atoms/drawer";

interface Province {
    id: number;
    name: string;
}

interface City {
    id: number;
    name: string;
    province_id: string;
}

const provinceList: Province[] = provinces.data;
const cityList: City[] = cites.data;

function LocationSelector() {
    // حالت موبایل یا دسکتاپ با matchMedia
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        }

        handleResize(); // مقداردهی اولیه

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);

    const inputRef = useRef<HTMLDivElement | null>(null);
    const [triggerWidth, setTriggerWidth] = useState<number>(0);

    useLayoutEffect(() => {
        if (inputRef.current) {
            setTriggerWidth(inputRef.current.offsetWidth);
        }
    }, [inputValue, open]);

    const handleProvinceSelect = (province: Province) => {
        setSelectedProvince(province);
        setSearchTerm("");
    };

    const handleCitySelect = (city: City) => {
        setInputValue(city.name);
        setOpen(false);
        setSelectedProvince(null);
    };

    const filteredItems = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        if (selectedProvince) {
            return cityList.filter(
                (city) =>
                    city.province_id === selectedProvince.id.toString() &&
                    city.name.toLowerCase().includes(term)
            );
        }

        return provinceList.filter((province) =>
            province.name.toLowerCase().includes(term)
        );
    }, [selectedProvince, searchTerm]);

    const handleInputClick = () => {
        setOpen((prev) => !prev);
        setSearchTerm("");
        setSelectedProvince(null);
    };

    const InputTrigger = (
        <Input
            value={inputValue || "لطفا شهر خود را انتخاب کنید"}
            className="text-right cursor-pointer"
            onClick={handleInputClick}
            onChange={(e) => setInputValue(e.target.value)}
            endIcon={
                <Icon
                    id="arrow_left"
                    className={cn(
                        open ? "rotate-90" : "-rotate-90",
                        "w-4 h-4 fill-secondary-500"
                    )}
                />
            }
            readOnly
        />
    );

    const SearchBox = (
        <>
            <Input
                placeholder={selectedProvince ? "جستجوی شهرها..." : "جستجوی استان‌ها..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-2 font-medium"
                startIcon={
                    <Icon
                        id="Search"
                        className="w-5 h-5 cursor-pointer fill-secondary-500 "
                    />
                }
            />
            <div className="max-h-56 overflow-auto space-y-1 w-full">
                {filteredItems.map((item) => (
                    <p
                        key={item.id}
                        className="flex justify-between items-center w-full py-2 px-2 cursor-pointer border-b"
                        onClick={() => {
                            if (selectedProvince) {
                                handleCitySelect(item as City);
                            } else {
                                handleProvinceSelect(item as Province);
                            }
                        }}
                    >
                        <span>{item.name}</span>
                        {!selectedProvince && <Icon id="arrow_left" className="w-4 h-4" />}
                    </p>
                ))}
            </div>
        </>
    );

    return (
        <div>
            {isMobile ? (
                <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerTrigger asChild>
                        {InputTrigger}
                    </DrawerTrigger>
                    <DrawerContent className="px-4 py-6">
                        {SearchBox}
                    </DrawerContent>
                </Drawer>
            ) : (
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <div ref={inputRef} className="w-full">
                            {InputTrigger}
                        </div>
                    </PopoverTrigger>
                    <PopoverContent
                        className="!min-w-full w-full mt-2"
                        style={{ width: triggerWidth }}
                    >
                        {SearchBox}
                    </PopoverContent>
                </Popover>
            )}
        </div>
    );
}

export default LocationSelector;
