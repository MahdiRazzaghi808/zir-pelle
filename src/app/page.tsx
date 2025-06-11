"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/atoms/accordion";
import { Icon } from "@/components/atoms/icon";
import { Input } from "@/components/atoms/input";
import BottomNavigation from "@/components/molecules/bottom-navigation";
import { ExampleCombobox } from "@/components/molecules/example-combobox";
import Image from "next/image";
import { useState } from "react";

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "sveltekit", label: "SvelteKit" },
];

export default function Home() {
  const [value, seValue] = useState("");

  const handleChange = (val: string) => {
    console.log("انتخاب شد:", val);
  };



  return (
    <div className="md:h-screen">
      <div className="w-full h-full flex flex-col justify-center items-center dir-rtl">
        <div className="md:w-xl mx-auto  flex flex-col gap-4 justify-center items-center">
          <Image
            src="/images/login-logo.svg"
            alt="login"
            width={100}
            height={100}
            className="mx-auto mb-4"
          />

          <Input
            placeholder="اجاره خودرو، خانه، ابزار..."
            startIcon={<Icon id="Search" className="w-6 h-6 fill-secondary-500 cursor-pointer" />}
            value={value}
            onChange={(e) => seValue(e.target.value)}
            className="w-full pr-12 search-input search-input__mainPage" />
        </div>

      </div>
      <BottomNavigation />

      <div className="hidden md:block fixed bottom-0 w-screen bg-primary-200 py-2 text-center">
        حقوق این سایت متعلق به سایت زیرپله است
      </div>

      {/* <Accordion
        type="single"
        collapsible
        className="w-full max-w-md mx-auto mt-8"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>عنوان اول</AccordionTrigger>
          <AccordionContent>این محتوای آکاردئون اول است.</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>عنوان دوم</AccordionTrigger>
          <AccordionContent>این محتوای آکاردئون دوم است.</AccordionContent>
        </AccordionItem>
      </Accordion>
      {/* <ExampleCombobox options={frameworks} onChange={handleChange} /> */}
    </div>
  );
}
