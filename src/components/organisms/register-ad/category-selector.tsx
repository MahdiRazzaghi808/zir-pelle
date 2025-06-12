"use client";

import React, { useState, useMemo, ChangeEvent, useRef, useLayoutEffect } from "react";
import { Input } from "@/components/atoms/input";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/atoms/popover";
import { Icon } from "@/components/atoms/icon";
import { cn } from "@/utils/cn";

interface Category {
    id: number;
    name: string;
}

interface SubCategory {
    id: number;
    name: string;
    parent_id: number;
}

const parentCategories: Category[] = [
    { id: 1, name: "کالای دیجیتال" },
    { id: 2, name: "پوشاک" },
];

const subCategories: SubCategory[] = [
    { id: 101, name: "موبایل", parent_id: 1 },
    { id: 102, name: "لپ‌تاپ", parent_id: 1 },
    { id: 201, name: "مانتو", parent_id: 2 },
    { id: 202, name: "کفش", parent_id: 2 },
];

function CategorySelector() {
    const [selectedParent, setSelectedParent] = useState<Category | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);

    const handleParentSelect = (category: Category) => {
        setSelectedParent(category);
        setSearchTerm("");
    };

    const handleSubSelect = (sub: SubCategory) => {
        setInputValue(sub.name);
        setOpen(false);
        setSelectedParent(null); // reset
    };

    const filteredItems = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        if (selectedParent) {
            return subCategories.filter(
                (sub) =>
                    sub.parent_id === selectedParent.id &&
                    sub.name.toLowerCase().includes(term)
            );
        }

        return parentCategories.filter((cat) =>
            cat.name.toLowerCase().includes(term)
        );
    }, [selectedParent, searchTerm]);

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
            setSelectedParent(null)
            setOpen(!open)

        }}>
            <PopoverTrigger asChild>
                <div
                    ref={inputRef} className="w-full"
                >
                    <Input
                        value={inputValue || "لطفاً دسته‌بندی را انتخاب کنید"}
                        className="text-right cursor-pointer"

                        onClick={() => setOpen(!open)}
                        onChange={() => { }}
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
            <PopoverContent className="!min-w-full w-full mt-2" style={{ width: triggerWidth }}
            >
                <Input
                    placeholder={selectedParent ? "جستجوی زیرمجموعه..." : "جستجوی دسته‌بندی..."}
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
                <div className="max-h-60 overflow-auto space-y-1">
                    {filteredItems.map((item) => (
                        <p
                            key={item.id}
                            className="flex justify-between items-center w-full py-2 cursor-pointer border-b"
                            onClick={() => {
                                if (selectedParent) {
                                    handleSubSelect(item as SubCategory);
                                } else {
                                    handleParentSelect(item as Category);
                                }
                            }}
                        >
                            <span>{item.name}</span>
                            {!selectedParent && (
                                <Icon id="arrow_left" className="w-4 h-4" />
                            )}
                        </p>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default CategorySelector;
