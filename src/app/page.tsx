"use client";
import { Icon } from "@/components/atoms/icon";
import { Input } from "@/components/atoms/input";
import BottomNavigation from "@/components/molecules/bottom-navigation";
import Footer from "@/components/organisms/layout/footer";
import Slider from "@/components/organisms/main/slider";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";



export default function Home() {
  const [value, seValue] = useState("");





  return (
    <div className="md:h-screen">
      <div className="w-full h-full flex flex-col justify-center items-center dir-rtl">
        <div className="px-4 w-full md:w-xl mx-auto flex flex-col gap-4 justify-center items-center">
          <Link href="/">
            <Image
              src="/images/login-logo.svg"
              alt="login"
              width={100}
              height={100}
              className="mx-auto mb-4"
            />
          </Link>


          <Input
            placeholder="اجاره خودرو، خانه، ابزار..."
            startIcon={<Icon id="Search" className="w-6 h-6 fill-secondary-500 cursor-pointer" />}
            value={value}
            onChange={(e) => seValue(e.target.value)}
            className="w-full pr-12 search-input search-input__mainPage" />
        </div>

        <div className="md:hidden w-full px-4 my-8  overflow-hidden flex flex-col gap-6">
          <Slider />
          <Image src="/images/zirpelle-banner.svg" alt="banner" width={400} height={160} className="w-full h-[190px] sm:h-[240px] rounded-xl object-cover" />
          <Slider />
          <Slider />
        </div>
      </div>

      <div className="md:hidden mb-10">
        <Footer />
      </div>

      <BottomNavigation />

      <div className="hidden md:block fixed bottom-0 w-screen bg-primary-200 py-2 text-center">
        حقوق این سایت متعلق به سایت زیرپله است
      </div>


    </div>
  );
}
