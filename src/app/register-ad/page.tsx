"use client"
// React & Next
import React from 'react'

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
    FormLabel,
    FormMessage
} from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";

// Constants / i18n
import t from "@/json/fa.json";
import { Icon } from '@/components/atoms/icon'
import CategorySelector from '@/components/organisms/register-ad/category-selector';
import { Textarea } from '@/components/atoms/textarea';
import LocationSelector from '@/components/organisms/register-ad/location-selector';
import { RadioGroup, RadioGroupItem } from '@/components/atoms/radio-group';
import { Checkbox } from '@/components/atoms/checkbox';
import Uploader from '@/components/organisms/register-ad/uploader';
import Link from 'next/link';


function page() {


    const form = useForm<PostLoginRequest>({
        resolver: zodResolver(postLoginSchema.request),
    });

    const mutation = usePostLogin({
        onSuccess: (data) => {
            if (data?.data) {
                toast.success("کد تایید ارسال شد");
                // setStep("otp");
            } else {
                toast.error(t.toast.error.auth);
            }
        },
    });


    const handlePhoneSubmit = (data: PostLoginRequest) => {
        const trimmedPhone = data.phoneNumber.trim();
        mutation.mutate({ phoneNumber: trimmedPhone });
    };

    return (
        <div className='px-8 md:max-w-[800px] my-16 md:my-[92px] mx-auto'>
            <div className='flex flex-col gap-6'>
                <div className='flex justify-between'>
                    <h1 className='font-bold text-[1.7rem] sm:text-2xl'>ثبت آگهی</h1>
                    <Link href="/" className='flex justify-center gap-2 items-center text-primary px-3 py-2 border border-primary rounded-lg md:rounded-3xl'>
                        <p className='flex gap-1 font-normal'>
                            <span className='hidden md:block'>بازگشت به</span>
                            <span>صفحه اصلی</span>
                        </p>

                        <Icon id="home" className="fill-primary" />
                    </Link>
                </div>

                <p className='text-lg'>اطلاعات مربوط به آگهی را پر کنید</p>

            </div>



            <Form {...form}>
                <form
                    autoComplete="off"
                    className="space-y-12 mt-8"
                    onSubmit={form.handleSubmit(handlePhoneSubmit)}
                >


                    <div className='flex flex-col gap-6'>
                        <h3 className='text-lg font-bold'>اطلاعات محصول</h3>


                        <div className='flex flex-col gap-8'>

                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>نام محصول</FormLabel>

                                        <FormControl>
                                            <Input
                                                autoComplete="off"
                                                placeholder="نام کامل محصول"
                                                className=" border-none"
                                                disabled={mutation.isPending}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="-bottom-5 right-4" />
                                    </FormItem>
                                )}
                            />

                            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                                <FormField
                                    control={form.control}
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>قیمت اجاره روزانه</FormLabel>

                                            <FormControl>
                                                <Input
                                                    autoComplete="off"
                                                    placeholder="32,000 | تومان"
                                                    className="border-none placeholder:text-lg font-semibold"
                                                    placeholderAlign='left'
                                                    textAlign='left'
                                                    disabled={mutation.isPending}
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
                                            <FormLabel>قیمت اجاره ماهانه</FormLabel>

                                            <FormControl>
                                                <Input
                                                    autoComplete="off"
                                                    placeholder="650,000 | تومان"
                                                    className="border-none placeholder:text-lg font-semibold"
                                                    disabled={mutation.isPending}
                                                    placeholderAlign='left'
                                                    textAlign='left'
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
                                            <FormLabel>قیمت اجاره سالانه</FormLabel>

                                            <FormControl>
                                                <Input
                                                    autoComplete="off"
                                                    placeholder="1,800,000 | تومان"
                                                    className="border-none placeholder:text-lg font-semibold"
                                                    disabled={mutation.isPending}
                                                    placeholderAlign='left'
                                                    textAlign='left'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="-bottom-5 right-4" />
                                        </FormItem>
                                    )}
                                />
                            </div>


                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>دسته بندی</FormLabel>

                                        <FormControl>
                                            <CategorySelector />
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
                                        <FormLabel>توضیحات</FormLabel>

                                        <FormControl>
                                            <Textarea
                                                autoComplete="off"
                                                placeholder="توضیحات محصول یا خدمت خود را وارد کنید"
                                                className=" border-none font-normal"
                                                disabled={mutation.isPending}
                                                {...field}
                                            />
                                        </FormControl>
                                        <p className='mt-4'>1/2000 کلمه</p>
                                        <FormMessage className="-bottom-5 right-4" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>


                    <div className='flex flex-col gap-6'>
                        <h3 className='text-lg font-bold'>اطلاعات لوکیشن</h3>


                        <div className='flex flex-col gap-8'>


                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>استان و شهر</FormLabel>

                                        <FormControl>
                                            <LocationSelector />
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
                                        <FormLabel>نشانی</FormLabel>

                                        <FormControl>
                                            <Textarea 
                                                className=" border-none font-normal"
                                                placeholder="نشانی خود را وارد کنید"
                                                disabled={mutation.isPending}
                                                {...field} />
                                        </FormControl>
                                        <FormMessage className="-bottom-5 right-4" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>


                    <div className='flex flex-col gap-6'>
                        <h3 className='text-lg font-bold'>اطلاعات کالا</h3>


                        <div className='flex flex-col gap-8'>

                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>وضعیت کالا</FormLabel>

                                        <FormControl>
                                            <RadioGroup {...field} className='flex  flex-row-reverse items-center gap-4'>
                                                <div className="flex items-center space-x-1">
                                                    <label htmlFor="option1" className="text-[20px]">نو</label>
                                                    <RadioGroupItem value="option1" id="option1" />
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <label htmlFor="option2" className="text-[20px]">در حد نو</label>
                                                    <RadioGroupItem value="option2" id="option2" />
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <label htmlFor="option3" className="text-[20px]">کارکرده</label>
                                                    <RadioGroupItem value="option3" id="option3" />
                                                </div>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage className="-bottom-5 right-4" />
                                    </FormItem>
                                )}
                            />

                            <div className='flex flex-col gap-2'>
                                <FormField
                                    control={form.control}
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>تصاویر  کالا</FormLabel>

                                            <FormControl>
                                                <Uploader />
                                            </FormControl>
                                            <FormMessage className="-bottom-5 right-4" />
                                        </FormItem>
                                    )}
                                />
                                <p className='text-primary font-light text-base'>
                                    *در صورتی که کالای دریافتی دارای ایراد یا نقص باشد، لطفاً عکس قسمت ضربه‌دیده را بارگذاری کنید
                                </p>
                            </div>

                        </div>
                    </div>


                    <div className='flex flex-col gap-6'>
                        <h3 className='text-lg font-bold'>تضامین</h3>


                        <div className='flex items-center flex-wrap gap-4 text-lg'>


                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <label className="flex items-center gap-2">
                                                <Checkbox {...field} />
                                                <span>سفته بانکی</span>
                                            </label>
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
                                            <label className="flex items-center gap-2">
                                                <Checkbox {...field} />
                                                <span>چک صیادی</span>
                                            </label>
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
                                            <label className="flex items-center gap-2">
                                                <Checkbox {...field} />
                                                <span>چک صیادی</span>
                                            </label>
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
                                            <label className="flex items-center gap-2">
                                                <Checkbox {...field} />
                                                <span>وجه نقد</span>
                                            </label>
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
                                            <label className="flex items-center gap-2">
                                                <Checkbox {...field} />
                                                <span>کارت ملی</span>
                                            </label>
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
                                            <label className="flex items-center gap-2">
                                                <Checkbox {...field} />
                                                <span>شناسنامه</span>
                                            </label>
                                        </FormControl>
                                        <FormMessage className="-bottom-5 right-4" />
                                    </FormItem>
                                )}
                            />

                        </div>
                    </div>


                    <div className='flex flex-col gap-6'>
                        <h3 className='text-lg font-bold'>اطلاعات بانکی</h3>


                        <div className='flex flex-col gap-8'>

                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>شماره کارت</FormLabel>

                                        <FormControl>
                                            <Input
                                                autoComplete="off"
                                                placeholder="۶۰۳۷-۹۹xx-xxxx-xxxx"
                                                className=" border-none"
                                                disabled={mutation.isPending}
                                                textAlign='left'
                                                placeholderAlign='left'
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
                                        <FormLabel>شماره حساب</FormLabel>

                                        <FormControl>
                                            <Input
                                                autoComplete="off"
                                                placeholder="۴۶۱۳xxxxxxxx۴۱۲"
                                                className=" border-none"
                                                disabled={mutation.isPending}
                                                textAlign='left'
                                                placeholderAlign='left'
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
                                        <FormLabel>شماره شبا</FormLabel>

                                        <FormControl>
                                            <Input
                                                autoComplete="off"
                                                placeholder="IR ۷۵۰۰۰۰۰xxxxxxxxxxxxxxxxx"
                                                className=" border-none"
                                                disabled={mutation.isPending}
                                                textAlign='left'
                                                placeholderAlign='left'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="-bottom-5 right-4" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>




                    <Button type="submit" className="w-full" disabled={mutation.isPending}>
                        {mutation.isPending ? <Loader2 className="animate-spin" /> : "ثبت آگهی"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default page