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

export default function AuthenticationPage() {
    const searchParams = useSearchParams();
    const next = searchParams.get("next");
    const [phone, setPhone] = useState("");
    
    const form = useForm<PostLoginRequest>({
        resolver: zodResolver(postLoginSchema.request),
        defaultValues: {
            phoneNumber: phone,
        },
    });

    const mutation = usePostLogin({
        onSuccess: (data) => {
            if (data?.data?.isSuccess) {
                toast.success("کد تایید ارسال شد");
                // setStep("otp");
            } else {
                toast.error(t.toast.error.auth);
            }
        },
    });

    const handlePhoneSubmit = (data: PostLoginRequest) => {
        const trimmedPhone = data.phoneNumber.trim();
        setPhone(trimmedPhone);
        mutation.mutate({ phoneNumber: trimmedPhone });
    };

    // Save to session on change
    useEffect(() => {
        sessionStorage.setItem("phone", phone);
    }, [phone]);

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
                        name="phoneNumber"
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

                    <Button type="submit" className="w-full" disabled={mutation.isPending}>
                        {mutation.isPending ? <Loader2 className="animate-spin" /> : "ادامه"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
