"use client";

import React, { useState } from "react";
import { Input } from "@/components/atoms/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/atoms/popover";
import { Icon } from "@/components/atoms/icon";

interface Province {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
  province_id: number;
}

const provinces: Province[] = [
  { id: 1, name: "تهران" },
  { id: 2, name: "اصفهان" },
  { id: 3, name: "فارس" },
  { id: 4, name: "آذربایجان شرقی" },
];

const cities: City[] = [
  { id: 101, name: "تهران", province_id: 1 },
  { id: 102, name: "اسلام‌شهر", province_id: 1 },
  { id: 103, name: "دماوند", province_id: 1 },
  { id: 201, name: "اصفهان", province_id: 2 },
  { id: 202, name: "کاشان", province_id: 2 },
  { id: 203, name: "خمینی‌شهر", province_id: 2 },
  { id: 301, name: "شیراز", province_id: 3 },
  { id: 302, name: "مرودشت", province_id: 3 },
  { id: 303, name: "کازرون", province_id: 3 },
  { id: 401, name: "تبریز", province_id: 4 },
  { id: 402, name: "مراغه", province_id: 4 },
  { id: 403, name: "اهر", province_id: 4 },
];

function Page() {
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const handleProvinceSelect = (province: Province) => {
    setSelectedProvince(province);
    setSearchTerm("");
  };

  const handleCitySelect = (city: City) => {
    setInputValue(city.name);
  };

  const filteredItems = selectedProvince
    ? cities.filter(
        (city) =>
          city.province_id === selectedProvince.id &&
          city.name.includes(searchTerm)
      )
    : provinces.filter((p) => p.name.includes(searchTerm));

  return (
    <div className="p-4 mx-auto">
      <div className="max-w-xl mx-auto">
        <Popover>
          <PopoverTrigger asChild>
            <Input
              value={inputValue}
              placeholder={selectedProvince ? "انتخاب شهر" : "انتخاب استان"}
              endIcon={<Icon id="arrow_left" className="w-4 h-4 fill-secondary-500 -rotate-90" />}
            />
          </PopoverTrigger>
          <PopoverContent className="min-w-full w-full">
            <Input
              placeholder={selectedProvince ? "جستجوی شهر..." : "جستجوی استان..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-2"
              startIcon={<Icon id="Search" className="w-5 h-5 cursor-pointer fill-secondary-500" />}
            />
            <div className="max-h-60 overflow-auto space-y-1 w-full">
              {filteredItems.map((item) => (
                <p
                  key={item.id}
                  className="flex justify-between items-center w-full py-2 cursor-pointer border-b"
                  onClick={() =>
                    selectedProvince
                      ? handleCitySelect(item)
                      : handleProvinceSelect(item)
                  }
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
      </div>
    </div>
  );
}

export default Page;