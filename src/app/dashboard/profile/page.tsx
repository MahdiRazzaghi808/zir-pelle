"use client"
import { postRequestOtpSchema } from '@/api/services/core/auth/request-otp/post/post-request-otp.schema'
import { PostRequestOtpRequest } from '@/api/services/core/auth/request-otp/post/post-request-otp.types'
import { usePostRequestOtp } from '@/api/services/core/auth/request-otp/post/use-post-request-otp'
import { Button } from '@/components/atoms/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/atoms/form'
import { Input } from '@/components/atoms/input'
import { Textarea } from '@/components/atoms/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, PlusIcon } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

function Profile() {
    const form = useForm<PostRequestOtpRequest>({
        resolver: zodResolver(postRequestOtpSchema.request),

    });


    const mutation = usePostRequestOtp({
        onSuccess: (data) => {
            console.log(data.data);

            if (data?.status === 200) {
                toast.success("کد تایید ارسال شد");
            } else {
                toast.error("");
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
    return (
        <div className='w-full'>
            <h1 className='font-bold text-xl'>اطلاعات کاربری</h1>
            <div className="w-full mx-auto ">
                <Form {...form}>
                    <form
                        autoComplete="off"
                        className="space-y-4 w-full"
                        onSubmit={form.handleSubmit(handlePhoneSubmit)}
                    >

                        <div className='flex flex-col gap-3'>
                            <p className='flex gap-1 mt-4 text-lg'>
                                <span>مشخصات فردی</span>
                                <span className='text-[#ff3f3e]'>*</span>
                            </p>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 w-full'>
                                <FormField
                                    control={form.control}
                                    name="phone_number"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    autoComplete="off"
                                                    placeholder="نام"
                                                    className="rounded-xl"
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
                                <FormField
                                    control={form.control}
                                    name="phone_number"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    autoComplete="off"
                                                    placeholder="نام خانوادگی"
                                                    className="rounded-xl"
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
                                <FormField
                                    control={form.control}
                                    name="phone_number"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    autoComplete="off"
                                                    placeholder="کد ملی"
                                                    className="rounded-xl"
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
                            </div>
                        </div>



                        <div className='flex flex-col gap-3'>
                            <p className='flex gap-1 mt-4 text-lg'>
                                <span>نشانی</span>
                                <span className='text-[#ff3f3e]'>*</span>
                            </p>
                            <Textarea
                                placeholder='نشانی خود را وارد کنید'
                            />
                        </div>



                        <div className='flex flex-col gap-3'>
                            <p className='flex items-center gap-1 mt-4 text-lg'>
                                <span>رمز عبور</span>
                                <span className='text-base'>(اختیاری)</span>
                            </p>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 w-full'>
                                <FormField
                                    control={form.control}
                                    name="phone_number"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    autoComplete="off"
                                                    placeholder="رمز عبور"
                                                    className="rounded-xl"
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
                                <FormField
                                    control={form.control}
                                    name="phone_number"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    autoComplete="off"
                                                    placeholder="تکرار رمز عبور "
                                                    className="rounded-xl"
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
                            </div>

                            <p className='text-primary'>*  رمز عبور باید حداقل 8 کاراکتر طول داشته باشد و شامل حروف بزرگ و کوچک، اعداد و نمادها باشد</p>

                        </div>



                        <div className='flex flex-col gap-3'>
                            <p className='flex gap-1 mt-4 text-lg'>
                                <span>مدارک هویتی</span>
                                <span className='text-[#ff3f3e]'>*</span>
                            </p>

                            <p className='text-base my-1'>کارت ملی خود را بارگزاری کنید</p>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 w-full'>
                                <FormField
                                    control={form.control}
                                    name="phone_number"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-base'>تصویر پشت کارت ملی</FormLabel>
                                            <FormControl>
                                                <div className='flex justify-center items-center bg-gray-100 w-full h-[240px] rounded-2xl border'>
                                                    <PlusIcon />
                                                </div>
                                            </FormControl>
                                            <FormMessage className="-bottom-5 right-4" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone_number"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-base'>تصویر روی کارت ملی</FormLabel>
                                            <FormControl>
                                                <div className='flex justify-center items-center bg-gray-100 w-full h-[240px] rounded-2xl border'>
                                                    <PlusIcon />
                                                </div>
                                            </FormControl>
                                            <FormMessage className="-bottom-5 right-4" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <p className='text-primary'>*  فرمت عکس باید jpg , jpeg , png باشد</p>

                        </div>


                        <div className='flex flex-col gap-3'>
                            <p className='flex gap-1 mt-4 text-lg'>
                                <span>آپلود تصویر امضا</span>
                                <span className='text-[#ff3f3e]'>*</span>
                            </p>


                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 w-full'>
                                <FormField
                                    control={form.control}
                                    name="phone_number"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className='flex justify-center items-center bg-gray-100 w-full lg:w-[336px] h-[240px] rounded-2xl border'>
                                                    <PlusIcon />
                                                </div>
                                            </FormControl>
                                            <FormMessage className="-bottom-5 right-4" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-fit px-12" disabled={mutation.isPending}>
                            {mutation.isPending ? <Loader2 className="animate-spin" /> : "ثبت نهایی"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Profile