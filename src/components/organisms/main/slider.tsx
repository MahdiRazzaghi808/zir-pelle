'use client';

import Card from '@/components/molecules/card';
import Link from 'next/link';
import React from 'react';

function Slider() {
  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center px-2">
        <h2 className="flex items-center gap-1 font-semibold whitespace-nowrap">
          <span className="text-lg text-primary">ترند های</span>
          <span className="text-xl">لوازم خانه</span>
        </h2>
        <Link href="/" className="text-secondary-400 font-semibold whitespace-nowrap">
          مشاهده همه
        </Link>
      </div>

      {/* Horizontal Scroll Slider */}
      <div className="flex overflow-x-auto gap-4 scrollbar-hide px-2  w-screen">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="w-[172px] flex-shrink-0">
            <Card />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
