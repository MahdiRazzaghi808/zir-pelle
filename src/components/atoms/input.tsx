import { ComponentProps, forwardRef, ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { toEnNumbers } from "@/utils/numbers";
import { toast } from "sonner";

const inputVariants = cva(
  "leading-7 disabled:cursor-not-allowed disabled:text-slate-500 rounded-3xl border-slate-400 focus:border-slate-600",
  {
    variants: {
      variant: {
        default:
          "h-12 w-full border-2 border-[#eeeeee] bg-[#F8F8F8] px-5 py-1.5 file:bg-transparent text-lg file:text-sm file:font-medium text-black/70 file:text-black/70 file:border-0 focus-visible:outline-none focus:border-[#eeeeee]",
        ghost: "w-full h-full text-center appearance-none focus:outline-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type InputProps = Omit<ComponentProps<"input">, "value"> & {
  value?: string | number | readonly string[] | undefined | null;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onlyLatin?: boolean;
  isError?: boolean;
  textAlign?: "left" | "right";
  placeholderAlign?: "left" | "right";
} & VariantProps<typeof inputVariants>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = "default",
      startIcon,
      endIcon,
      value,
      onlyLatin = false,
      textAlign = "right",
      placeholderAlign = "right",
      isError,
      onChange,
      ...props
    },
    ref
  ) => {

    return (
      <div className="relative flex items-center w-full">
        {startIcon}
        <input
          ref={ref}
          value={onChange ? value || "" : value ?? undefined}
          className={cn(
            inputVariants({ variant }),
            `text-${textAlign}`,
            `placeholder:text-${placeholderAlign}`,
            isError ? "!text-[#FF3E3E] !border-[#FF3E3E] bg-[#fef0ef]" : ""
            ,
            className
          )}
          onChange={(e) => {
            if (!props.readOnly) {
              if (onlyLatin) {
                const inputValue = e.target.value;
                const latinRegex =
                  /^[A-Za-z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
                if (!latinRegex.test(inputValue)) {
                  toast.error(
                    "لطفاً فقط از حروف انگلیسی، اعداد و علائم مجاز استفاده کنید."
                  );
                  return;
                }
              }

              e.target.value = toEnNumbers(e.target.value);
              onChange?.(e);
            }
          }}
          {...props}
        />
        {endIcon}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
