"use client";

// React & Next
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// Third-party libraries
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Types & Schemas
import { PostVerifyOtpRequest } from "@/api/services/core/auth/verify-otp/post/post-verify-otp.types";
import { postVerifyOtpSchema } from "@/api/services/core/auth/verify-otp/post/post-verify-otp.schema";

// API Hooks
import { usePostVerifyOtp } from "@/api/services/core/auth/verify-otp/post/use-post-verify-otp";

// UI Components (Atoms)
import { Button } from "@/components/atoms/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/atoms/form";
import { InputOTPPattern } from "@/components/organisms/auth/otp";


// Constants / i18n
import { Icon } from "@/components/atoms/icon";
import { postRequestOtp } from "@/api/services/core/auth/request-otp/post/post-request-otp";
import { Step } from "@/app/(auth)/login/page";

interface OtpPageProps {
    setStep: React.Dispatch<React.SetStateAction<Step>>;
}

export default function OtpPage({ setStep }: OtpPageProps) {
    const searchParams = useSearchParams();
    const next = searchParams.get("next");

    const form = useForm<PostVerifyOtpRequest>({
        resolver: zodResolver(postVerifyOtpSchema.request),
        defaultValues: {
            phone_number: sessionStorage.getItem("phone") || '',
        }
    });

    const mutation = usePostVerifyOtp({
        onSuccess: (data) => {
            if (data?.status === 200) {
                window.location.href = next || '/';
            } else {
                toast.error("خطااا");
            }
        },
        onError: (error) => {
            console.log(error.message);
        }

    });

    const [secondsLeft, setSecondsLeft] = useState(120);
    const [resendPending, setResendPending] = useState(false);

    useEffect(() => {
        if (secondsLeft <= 0) return;

        const timer = setInterval(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [secondsLeft]);

    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60)
            .toString()
            .padStart(1, "0");
        const seconds = (totalSeconds % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    const handleResendCode = async () => {
        try {
            setResendPending(true);
            const data = await postRequestOtp({ phone_number: form.getValues("phone_number") });
            if (data?.status === 200) {
                setSecondsLeft(120);
                toast.success("کد مجدد ارسال شد");
            } else {
                toast.error("خطا در ارسال کد");
            }
        } catch (error) {
            toast.error("خطای غیرمنتظره");
        } finally {
            setResendPending(false);
        }
    };

    const isDisabled = mutation.isPending || resendPending;

    return (
        <div className="w-full mx-auto">
            <Form {...form}>
                <form
                    autoComplete="off"
                    className="space-y-4"
                    onSubmit={form.handleSubmit((data) => {
                        mutation.mutate({
                            phone_number: data.phone_number.trim(),
                            otp: data.otp.trim(),
                        });
                    })}
                >
                    <div className="flex flex-col gap-4 justify-center">
                        <p className="text-xl font-bold">تایید شماره همراه</p>
                        <p className="flex items-center gap-1">
                            <span>کد ارسال شده به شماره </span>
                            <span>099920801032</span>
                            <span>را وارد کنید</span>
                        </p>
                    </div>

                    <FormField
                        control={form.control}
                        name="otp"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <InputOTPPattern
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={!!form.formState.errors.otp}
                                        disabled={isDisabled}
                                    />
                                </FormControl>
                                <FormMessage className="-bottom-5 right-4" />
                            </FormItem>
                        )}
                    />

                    {secondsLeft > 0 ? (
                        <p className="text-center text-primary-700">
                            ارسال مجدد کد تا {formatTime(secondsLeft)} دیگر
                        </p>
                    ) : (
                        <p
                            className={`text-center text-primary-700 cursor-pointer ${isDisabled ? "opacity-50 pointer-events-none" : ""}`}
                            onClick={handleResendCode}
                        >
                            {resendPending ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "ارسال مجدد کد"}
                        </p>
                    )}

                    <div className="flex flex-col gap-1 items-start">
                        <Button
                            onClick={() => setStep("phone")}
                            size="sm"
                            disabled={isDisabled}
                            className="px-4 bg-transparent hover:bg-primary-100 text-primary-700 rounded-xs text-base font-medium"
                        >
                            <span>ویرایش شماره</span>
                            <Icon id="edit" className="w-4 h-4 fill-primary-700" />
                        </Button>

                        <Button
                            onClick={() => setStep("password")}
                            size="sm"
                            disabled={isDisabled}
                            className="px-4 bg-transparent hover:bg-primary-100 text-primary-700 rounded-xs text-base font-medium"
                        >
                            <span>ورود با رمز عبور</span>
                            <Icon id="arrow_left" className="w-4 h-4 fill-primary-700" />
                        </Button>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isDisabled}
                    >
                        {mutation.isPending || resendPending ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            "ادامه"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}