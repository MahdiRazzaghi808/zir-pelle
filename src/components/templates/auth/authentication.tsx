"use client";

// React & Next
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Third-party libraries
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Types & Schemas
import { postRequestOtpSchema } from "@/api/services/core/auth/request-otp/post/post-request-otp.schema";
import { PostRequestOtpRequest } from "@/api/services/core/auth/request-otp/post/post-request-otp.types";

// API Hooks
import { usePostRequestOtp } from "@/api/services/core/auth/request-otp/post/use-post-request-otp";

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
import { Step } from "@/app/(auth)/login/page";

interface AuthenticationPageProps {
    setStep: React.Dispatch<React.SetStateAction<Step>>;
}
export default function AuthenticationPage({ setStep }: AuthenticationPageProps) {

    const form = useForm<PostRequestOtpRequest>({
        resolver: zodResolver(postRequestOtpSchema.request),

    });

    const mutation = usePostRequestOtp({
        onSuccess: (data) => {
            console.log(data.data);

            if (data?.status === 200) {
                toast.success("کد تایید ارسال شد");
                setStep("otp");
            } else {
                toast.error(t.toast.error.auth);
            }
        },
        onError: (error) => {
            console.log(error.message);

            toast.error(error.message);
        }
    });

    const handlePhoneSubmit = (data: PostRequestOtpRequest) => {
        const trimmedPhone = data.phone_number.trim();
        mutation.mutate({ phone_number: trimmedPhone });
    };

    // Save to session on change
    useEffect(() => {
        sessionStorage.setItem("phone", form.getValues("phone_number"));
    }, [form.getValues("phone_number")]);

    return (
        <div className="w-full mx-auto ">
            <Form {...form}>
                <form
                    autoComplete="off"
                    className="space-y-4"
                    onSubmit={form.handleSubmit(handlePhoneSubmit)}
                >
                    <div className="flex flex-col gap-4 text-center">
                        <h1 className="text-xl font-bold">ورود یا ثبت نام</h1>
                        <p>برای ورود یا ثبت نام شماره همراه خود را وارد کنید</p>
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
                                        placeholderAlign="right"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="-bottom-5 right-4" />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full" disabled={mutation.isPending}>
                        {mutation.isPending ? <Loader2 className="animate-spin" /> : "ادامه"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
