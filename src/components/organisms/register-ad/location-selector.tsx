"use client";

import React, { useState, useMemo, ChangeEvent, useLayoutEffect, useRef } from "react";
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
    const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);

    const handleProvinceSelect = (province: Province) => {
        setSelectedProvince(province);
        setSearchTerm("");
    };

    const handleCitySelect = (city: City) => {
        setInputValue(city.name);
        setOpen(false);
        setSelectedProvince(null); // Reset province after city selection
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

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    const inputRef = useRef<HTMLDivElement | null>(null);
    const [triggerWidth, setTriggerWidth] = useState<number>(0);

    useLayoutEffect(() => {
        if (inputRef.current) {
            setTriggerWidth(inputRef.current.offsetWidth);
        }
    }, [inputRef.current, inputValue, open]);

    return (
        <Popover open={open} onOpenChange={() => {
            setSearchTerm("")
            setSelectedProvince(null)
            setOpen(!open)
        }}>
            <PopoverTrigger asChild>
                <div
                    ref={inputRef} className="w-full"
                >
                    <Input
                        value={inputValue || "لطفا شهر خود را انتخاب کنید"}
                        className="text-right cursor-pointer"
                        onClick={() => setOpen(!open)}
                        onChange={handleInputChange}
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
                </div>
            </PopoverTrigger>
            <PopoverContent className="!min-w-full w-full mt-2" style={{ width: triggerWidth }}>
                <Input
                    placeholder={selectedProvince ? "جستجوی شهرها..." : "جستجوی استان‌ها..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-2"
                    startIcon={
                        <Icon
                            id="Search"
                            className="w-5 h-5 cursor-pointer fill-secondary-500"
                        />
                    }
                />
                <div className="max-h-60 overflow-auto space-y-1 w-lg">
                    {filteredItems.map((item) => (
                        <p
                            key={item.id}
                            className="flex justify-between items-center w-full py-2 cursor-pointer border-b"
                            onClick={() => {
                                if (selectedProvince) {
                                    handleCitySelect(item as City);
                                } else {
                                    handleProvinceSelect(item as Province);
                                }
                            }}
                        >
                            <span>{item.name}</span>
                            {!selectedProvince && (
                                <Icon id="arrow_left" className="w-4 h-4" />
                            )}
                        </p>
                    ))}
                </div>
            </PopoverContent>
        </Popover>

    );
}

export default LocationSelector;
