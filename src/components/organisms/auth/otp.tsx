"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/atoms/input-otp";
import { cn } from "@/utils/cn";
import { REGEXP_ONLY_DIGITS } from "input-otp";

interface Props {
  error: boolean;
  disabled?: boolean;
  value: string;
  onChange: (val: string) => void;
}

export function InputOTPPattern({ value, onChange, error, disabled }: Props) {
  return (
    <InputOTP
      maxLength={4}
      pattern={REGEXP_ONLY_DIGITS}
      value={value}
      onChange={onChange}
      disabled={disabled}
      dir="ltr"
    >
      <InputOTPGroup dir="ltr" className="flex gap-2 mx-auto">
        {[...Array(4)].map((_, i) => (
          <InputOTPSlot
            className={cn("w-9 h-8.5 font-semibold !rounded-xs  text-center text-lg border-none",
              error ? "text-[#FF3E3E]" : "!text-primary-700",

            )}
            key={i} index={i}
            style={{ boxShadow: "none" }}
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}
