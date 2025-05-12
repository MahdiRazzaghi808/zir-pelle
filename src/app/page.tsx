"use client";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { DrawerDialog } from "@/components/atoms/DrawerDialog";
import { EditIcon } from "lucide-react";
import { useState } from "react";
import DatePicker from "@/components/atoms/date-picker/date-picker";
import DateObject from "react-date-object";

export default function Home() {
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState<DateObject | null>(null);
  console.log(selectedDate ? selectedDate.format("") : "null");

  return (
    <div className="font-vazir flex justify-center ">
      {/* <Input placeholder="تنظیمات" value={value} onChange={(e) => setValue(e.target.value)} /> */}
      {/* <PasswordInput placeholder="تنظیمات" value={value} onChange={(e) => setValue(e.target.value)} /> */}
      <DatePicker value={selectedDate} onChange={setSelectedDate} />{" "}
      {/* <PaginationTable
        totalCount={100}
        page={page}
        onPageChange={(page) => setPage(page)}
      /> */}
      {/* <DrawerDialog
        trigger={
          <Button variant="outline" className="gap-2">
            <EditIcon className="w-4 h-4" />
            ویرایش پیشرفته
          </Button>
        }
        title={
          <div className="flex justify-end">
            <p>تنظیمات حرفه‌ای</p>
          </div>
        }
        content={
          <div className="space-y-4">
            <Input
              placeholder="تنظیمات"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        }
      /> */}
    </div>
  );
}
