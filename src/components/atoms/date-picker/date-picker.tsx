"use client";

import React, { useEffect, useState } from "react";
import DatePickerLib from "react-multi-date-picker";
import Toolbar from "react-multi-date-picker/plugins/toolbar";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import DateObject from "react-date-object";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import "react-multi-date-picker/styles/layouts/mobile.css";
import { Input } from "../input";

const fullWeekDays = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
];

type CustomDatePickerProps = {
  value: DateObject | null; // الزامی چون کنترل‌شده است
  onChange: (date: DateObject | null) => void; // الزامی چون کنترل‌شده است
  minDate?: DateObject;
  mobileBreakpoint?: number;
  showToolbar?: boolean;
  weekDays?: string[];
  className?: string;
};

function DatePickerClient({
  value,
  onChange,
  minDate,
  mobileBreakpoint = 768,
  showToolbar = true,
  weekDays = fullWeekDays,
  className,
}: CustomDatePickerProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileBreakpoint]);

  if (!mounted) return null;

  return (
    <DatePickerLib
      value={value}
      onChange={onChange}
      calendar={persian}
      locale={persian_fa}
      weekDays={weekDays}
      className={className ?? (isMobile ? "rmdp-mobile" : "rmdp-prime")}
      minDate={minDate ?? new DateObject()}
      render={
        <Input />
      }
      plugins={[
        weekends(),
        ...(showToolbar
          ? [
            <Toolbar
              key="toolbar"
              position="bottom"
              names={{
                today: "امروز",
                deselect: "",
                close: "بستن",
              }}
            />,
          ]
          : []),
      ]}
    />
  );
}

export default DatePickerClient;
