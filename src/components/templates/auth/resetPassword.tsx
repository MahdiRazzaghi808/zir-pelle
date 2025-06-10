"use client";

// React & Next
import { useSearchParams } from "next/navigation";

// Third-party libraries
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Types & Schemas
import { PostPasswordResetRequest } from "@/api/services/core/auth/password/reset/post/post-password-reset.types";
import { postPasswordResetSchema } from "@/api/services/core/auth/password/reset/post/post-password-reset.schema";
// API Hooks
import { usePostPasswordReset } from "@/api/services/core/auth/password/reset/post/use-post-password-reset";

// UI Components (Atoms)
import { Button } from "@/components/atoms/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/atoms/form";

// Constants / i18n
import { PasswordInput } from "@/components/atoms/password-input";
import t from "@/json/fa.json";
import { InputOTPPattern } from "@/components/organisms/auth/otp";
import { useEffect, useState } from "react";
import { postForgotPassOtp } from "@/api/services/core/auth/password/forgot/post/post-forgot-pass-otp";


export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const next = searchParams.get("next");

    const form = useForm<PostPasswordResetRequest>({
        resolver: zodResolver(postPasswordResetSchema.request),
        defaultValues: {
            phone_number: sessionStorage.getItem("phone") || '',
        }
    });

    const mutation = usePostPasswordReset({
        onSuccess: (data) => {
            if (data.status === 200) {
                // window.location.href = next || '/';
            } else {
                toast.error(t.toast.error.auth);
            }
        },

    });


    const [secondsLeft, setSecondsLeft] = useState(5);
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

            const data = await postForgotPassOtp({ phone_number: sessionStorage.getItem("phone") || "" });
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
        <div className="w-full mx-auto ">
            <Form {...form}>
                <form
                    autoComplete="off"
                    className="space-y-4"
                    onSubmit={form.handleSubmit((data) => {
                        mutation.mutate({
                            phone_number: sessionStorage.getItem("phone") || "",
                            otp: data.otp,
                            password: data.password.trim(),
                            password_confirmation: data.password_confirmation.trim(),
                        });
                    })}
                >



                    <div className="flex flex-col gap-4 justify-center">
                        <p className="text-xl font-bold">رمز عبور جدید</p>
                        <p className="">
                            رمز عبور جدید خود را وارد کنید
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 justify-center">

                        <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <InputOTPPattern value={field.value} onChange={field.onChange} error={!!form.formState.errors.otp} />
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
                    </div>

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <PasswordInput
                                        disabled={mutation.isPending}
                                        textAlign="left"
                                        isError={!!form.formState.errors.password}
                                        placeholder="رمز عبور جدید"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="-bottom-5 right-4" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password_confirmation"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <PasswordInput
                                        disabled={mutation.isPending}
                                        textAlign="left"
                                        isError={!!form.formState.errors.password_confirmation}
                                        placeholder="تکرار رمز عبور جدید"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="-bottom-5 right-4" />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? (
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
