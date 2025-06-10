"use client";

// React & Next
import Link from "next/link";

// Third-party libraries
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Types & Schemas
import { postForgotPassOtpSchema } from "@/api/services/core/auth/password/forgot/post/post-forgot-pass-otp.schema";
import { PostForgotPassOtpRequest } from "@/api/services/core/auth/password/forgot/post/post-forgot-pass-otp.types";

// API Hooks
import { usePostForgotPassOtp } from "@/api/services/core/auth/password/forgot/post/use-post-forgot-pass-otp";


// UI Components (Atoms)
import { Button } from "@/components/atoms/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";

// Constants / i18n
import t from "@/json/fa.json";
import { ForgetPasswordStep } from "@/app/(auth)/forget-password/page";


interface ForgetPasswordPageProps {
    setStep: React.Dispatch<React.SetStateAction<ForgetPasswordStep>>;
}

export default function ForgetPasswordPage({ setStep }: ForgetPasswordPageProps) {


    const form = useForm<PostForgotPassOtpRequest>({
        resolver: zodResolver(postForgotPassOtpSchema.request),
    });

    const mutation = usePostForgotPassOtp({
        onSuccess: (data) => {
            if (data.status === 200) {
                sessionStorage.setItem("phone", form.getValues("phone_number"));
                setStep("reset-password")
            } else {
                toast.error(t.toast.error.auth);
            }
        },

    });

    return (
        <div className="w-full mx-auto ">
            <Form {...form}>
                <form
                    autoComplete="off"
                    className="space-y-4"
                    onSubmit={form.handleSubmit((data) => {
                        mutation.mutate({
                            phone_number: data.phone_number.trim(),
                        });
                    })}
                >



                    <div className="flex flex-col gap-4 justify-center">
                        <p className="text-xl font-bold">فراموشی رمز عبور</p>
                        <p className="">
                            شماره همراه خود را وارد کنید
                        </p>
                    </div>

                    <FormField
                        control={form.control}
                        name="phone_number"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        autoComplete="off"
                                        placeholder="شماره همراه"
                                        className="pr-6"
                                        disabled={mutation.isPending}
                                        textAlign="left"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="-bottom-5 right-4" />
                            </FormItem>
                        )}
                    />

                    <div className="flex flex-col items-start">
                        <Link href="login" className="px-4 bg-transparent hover:bg-primary-100 text-primary-700 rounded-xs text-base font-medium">
                            <span>ورود با کد یکبار مصرف</span>
                        </Link>
                    </div>

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
