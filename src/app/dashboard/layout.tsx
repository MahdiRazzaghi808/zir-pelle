'use client';

import { Icon } from "@/components/atoms/icon";
import { Input } from "@/components/atoms/input";
import Footer from "@/components/organisms/layout/footer";
import SideBar from "@/components/organisms/layout/side-bar";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [value, setValue] = useState("");
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <div>
      {/* Header */}
      <header className={cn("border-b z-[999] w-full bg-white", sideBarOpen && "fixed -translate-y-12")}>
        <div className="container py-3 px-4 flex justify-between items-center">
          <div className="flex items-center gap-4 w-full">
            
            <Link href="/">
              <Image
                src="/images/logo.svg"
                alt="logo"
                width={166}
                height={72}
                className="w-[99px] h-[38px] hidden lg:block"
              />
            </Link>

            {/* Menu Button - Mobile */}
            {!sideBarOpen && <Icon id="menu" className="lg:hidden cursor-pointer" onClick={() => setSideBarOpen(true)} />}
            {!!sideBarOpen && <Icon id="close" className="w-6 h-6 cursor-pointer" onClick={() => setSideBarOpen(false)} />}


            {/* Search Input */}
            <Input
              placeholder="نام کالا را وارد کنید"
              startIcon={<Icon id="Search" className="w-6 h-6 fill-secondary-500 cursor-pointer" />}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full lg:w-xl pr-12 search-input"
            />
          </div>

          <div className="hidden lg:block w-0.5 h-6 bg-black/30 rounded-full" />
        </div>
      </header>

      {/* Sidebar - Mobile */}
      {sideBarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/30 lg:hidden"
          onClick={() => setSideBarOpen(false)}
        >
          <div
            className="bg-white w-[290px] h-full pt-6 transition-transform duration-300 translate-x-0 ml-auto relative"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="mt-12">
              <SideBar />
            </div>
          </div>
        </div>
      )}

      <main className="container min-h-screen">
        <div className="flex gap-12 my-12 px-4 xl:px-0">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block">
            <SideBar />
          </aside>

          {/* Content */}
          <section className="w-full">{children}</section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
