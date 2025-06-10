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
import { PasswordInput } from "@/components/atoms/password-input";

export default function PasswordPage() {
    const searchParams = useSearchParams();
    const next = searchParams.get("next");

    const form = useForm<PostLoginRequest>({
        resolver: zodResolver(postLoginSchema.request),
    });

    const mutation = usePostLogin({
        onSuccess: (data) => {
            if (data?.data) {
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
                        <p className="text-xl font-bold">ورود با رمز عبور</p>
                        <p className="">
                            رمز عبور خود را وارد کنید
                        </p>
                    </div>

                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <PasswordInput
                                        disabled={mutation.isPending}
                                        textAlign="left"
                                        isError={!!form.formState.errors.phoneNumber}
                                        placeholder="رمز عبور"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="-bottom-5 right-4" />
                            </FormItem>
                        )}
                    />

                    <div className="flex flex-col items-start">
                        <Button size="sm" className="px-4 bg-transparent hover:bg-primary-100 text-primary-700 rounded-xs text-base font-medium">
                            <span>فراموشی رمز عبور</span>
                        </Button>

                        <Button size="sm" className="px-4 bg-transparent hover:bg-primary-100 text-primary-700 rounded-xs text-base font-medium">
                            <span>ورود با کد یکبار مصرف</span>
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
