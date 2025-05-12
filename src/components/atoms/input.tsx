
import { ComponentProps, forwardRef, ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { toEnNumbers } from "@/utils/numbers";
import { toast } from "sonner";

const inputVariants = cva(
  "placeholder:text-slate-400 leading-7 disabled:cursor-not-allowed disabled:text-slate-500 rounded-2xl border-slate-400 focus:border-slate-600 bg-",
  {
    variants: {
      variant: {
        default:
          "h-10 w-full border bg-white px-5 py-1.5 file:bg-transparent file:text-sm file:font-medium text-slate-800 file:text-slate-950 text-base file:border-0 focus-visible:outline-none",
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
  onlyLatin?: boolean;
  endIcon?: ReactNode;
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
      onChange,
      ...props
    },
    ref
  ) => {
    return (
      <div className="relative flex items-center">
        {startIcon}
        <input
          className={cn(inputVariants({ variant }), className)}
          ref={ref}
          value={onChange ? value || "" : (value ?? undefined)}
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
