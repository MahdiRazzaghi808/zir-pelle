"use client";

// React & Next
import Image from "next/image";
import { useSearchParams } from "next/navigation";

// Third-party libraries
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Types & Schemas
import { postLoginSchema } from "@/api/services/core/auth/login/post/post-login.schema";
import { PostLoginRequest } from "@/api/services/core/auth/login/post/post-login.types";

// API Hooks
import { usePostLogin } from "@/api/services/core/auth/login/post/use-post-login";

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
import { InputOTPPattern } from "@/components/organisms/auth/otp";
import { useState } from "react";
import { Icon } from "@/components/atoms/icon";

export default function OtpPage() {
    const searchParams = useSearchParams();
    const next = searchParams.get("next");
    const form = useForm<PostLoginRequest>({
        resolver: zodResolver(postLoginSchema.request),
    });

    const mutation = usePostLogin({
        onSuccess: (data) => {
            if (data?.data?.isSuccess) {
                // window.location.href = next || '/';
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
                            phoneNumber: data.phoneNumber.trim(),
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
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <InputOTPPattern value={field.value} onChange={field.onChange} error={!!form.formState.errors.phoneNumber} />
                                </FormControl>
                                <FormMessage className="-bottom-5 right-4" />
                            </FormItem>
                        )}
                    />

                    <p className="text-center text-primary-700 cursor-pointer">
                        <span>
                            ارسال مجدد کد
                        </span>
                        <span>
                            تا
                        </span>
                        {" "}
                        <span>
                            1:54
                        </span>
                        {" "}
                        <span>
                            دیگر
                        </span>
                    </p>

                    <div className="flex flex-col gap-1 items-start">
                        <Button size="sm" className="px-4 bg-transparent hover:bg-primary-100 text-primary-700 rounded-xs text-base font-medium">
                            <span>ویرایش شماره</span>
                            <Icon id="edit" className="w-4 h-4 fill-primary-700" />
                        </Button>

                        <Button size="sm" className="px-4 bg-transparent hover:bg-primary-100 text-primary-700 rounded-xs text-base font-medium">
                            <span>ورود با رمز عبور</span>
                            <Icon id="arrow_left" className="w-4 h-4 fill-primary-700" />
                        </Button>
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
