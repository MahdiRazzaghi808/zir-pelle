"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { Plus, X } from "lucide-react";

function Uploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPreviews((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      {previews.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {previews.map((src, index) => (
            <div
              key={index}
              className="relative w-full h-24 rounded-xl overflow-hidden border border-gray-300 shadow-sm"
            >
              <Image src={src} alt={`preview-${index}`} layout="fill" objectFit="cover" />

              <button
                onClick={() => handleRemove(index)}
                className="absolute top-1 right-1 bg-white/80 text-gray-600 hover:text-red-500 p-1 rounded-full shadow"
              >
                <X size={16} />
              </button>
            </div>
          ))}

          <div
            onClick={triggerFileInput}
            className="w-full h-24 flex items-center justify-center rounded-xl bg-tertiary-200 text-gray-400 hover:border-primary hover:text-primary cursor-pointer transition"
          >
            <Plus className="w-8 h-8" />
          </div>
        </div>
      ) : (
        <Image
          src="/images/uploader.svg"
          alt="uploader"
          onClick={triggerFileInput}
          width={400}
          height={400}
          className="w-full object-cover h-[400px] cursor-pointer"
        />
      )}

      <input
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}

export default Uploader;
