"use client";

// React & Next
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

// Constants / i18n
import { PasswordInput } from "@/components/atoms/password-input";
import t from "@/json/fa.json";
import { InputOTPPattern } from "@/components/organisms/auth/otp";

export default function ResetPasswordPage() {
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
                        <p className="text-xl font-bold">رمز عبور جدید</p>
                        <p className="">
                            رمز عبور جدید خود را وارد کنید
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 justify-center">

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
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <PasswordInput
                                        disabled={mutation.isPending}
                                        textAlign="left"
                                        isError={!!form.formState.errors.phoneNumber}
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
