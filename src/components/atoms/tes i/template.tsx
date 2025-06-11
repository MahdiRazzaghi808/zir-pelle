/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

// React & Next
import { useSearchParams } from "next/navigation";
import Image from "next/image";

// Third-party libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

// Types & Schemas
import { PostLoginRequest } from "@/api/services/core/auth/login/post/post-login.types";
import { postLoginSchema } from "@/api/services/core/auth/login/post/post-login.schema";

// API Hooks
import { usePostLogin } from "@/api/services/core/auth/login/post/use-post-login";

// UI Components (Atoms)
import { Icon } from "@/components/atoms/icon";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import { PasswordInput } from "@/components/atoms/password-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atoms/form";

// Constants / i18n
import t from "@/json/fa.json";

export default function LoginPage() {
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
    <div className="w-full h-screen flex  items-center justify-center">
      <div className="w-full max-w-md mx-auto border-2 border-dashed border-primary-300 rounded-3xl p-6">
        <Form {...form}>
          <form
            autoComplete="off"
            className="space-y-7"
            onSubmit={form.handleSubmit((data) => {
              mutation.mutate({
                phoneNumber: data.phoneNumber.toString(),
                // password: data.password.toString(),
              });
            })}
          >
            <Image
              src="/images/logo-black.png"
              alt=""
              width={100}
              height={100}
              className="mx-auto block"
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام کاربری</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      // placeholder="لطفا نام کاربری خود را وارد کنید"
                      className="bg-slate-100 pr-10"
                      disabled={mutation.isPending}
                      onlyLatin
                      // startIcon={
                      //   <Icon
                      //     id="profile-1"
                      //     size={22}
                      //     className="fill absolute right-3 -scale-x-100"
                      //   />
                      // }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="-bottom-5 right-4" />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رمز عبور</FormLabel>
                  <FormControl>
                    <PasswordInput
                      autoComplete="new-password"
                      // placeholder="لطفا رمز عبور خود را وارد کنید"
                      className="bg-slate-100 pr-10"
                      disabled={mutation.isPending}
                      onlyLatin
                      // startIcon={
                      //   <Icon
                      //     id="password"
                      //     size={22}
                      //     className="absolute right-3 -scale-x-100"
                      //   />
                      // }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="-bottom-5 right-4" />
                </FormItem>
              )}
            /> */}

            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "ورود"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
