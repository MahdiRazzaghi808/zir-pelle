'use client';
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const buttonVariants = cva(
  'cursor-pointer inline-flex items-center justify-center text-slate-800 gap-2 whitespace-nowrap rounded-3xl text-lg font-semibold  ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 ',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary-600/80',
        destructive: 'bg-[#E53935] text-white hover:bg-[#E53935]/80',
        success: 'bg-emerald-600 text-white hover:bg-emerald-600/80',
        outline: 'border border-slate-800  text-slate-800',
        secondary: 'bg-white text-slate-800 hover:bg-white/70',
        ghost: 'hover:bg-slate-200 hover:text-slate-800',
        link: 'text-slate-800 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-12 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-15 rounded-md px-8',
        icon: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, type = 'button', size, asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        type={type}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
