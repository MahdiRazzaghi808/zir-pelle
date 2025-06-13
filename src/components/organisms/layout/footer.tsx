import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/atoms/accordion'
import { Icon } from '@/components/atoms/icon'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <div className='border-t px-2'>
            <div className="hidden md:grid container  lg:grid-cols-6 gap-20 py-12">

                <div className="col-span-2 flex flex-col gap-6">
                    <Image
                        src="/images/logo.svg"
                        alt="logo"
                        width={166}
                        height={72}
                        className="w-[166px] h-[72px]"
                    />
                    <p className="text-justify text-base xl:text-lg">
                        زیر پله یک پلتفرم آنلاین برای اجاره انواع کالا، خانه، خودرو و دیگر وسایل به‌صورت روزانه، ماهانه و سالانه است. کاربران می‌توانند به‌سادگی اقلام خود را برای اجاره ثبت کرده یا نیازهایشان را برطرف کنند.
                    </p>
                </div>

                <div className="flex justify-center">
                    <div>
                        <h3 className="text-lg xl:text-xl font-bold mb-7">دسته بندی ها</h3>
                        <ul className="space-y-5 text-base xl:text-lg text-black/80">
                            <li>
                                <Link href="/" className="hover:text-primary transition">
                                    خانه و آشپز خانه
                                </Link>
                            </li>
                            <li>
                                <Link href="/about-us" className="hover:text-primary transition">
                                    الکترونیک و دیجیتال
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="hover:text-primary transition">
                                    مد و پوشاک
                                </Link>
                            </li>
                            <li>
                                <Link href="/booking" className="hover:text-primary transition">
                                    کتاب و لوازم تحریر
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div>
                        <h3 className="text-lg xl:text-xl font-bold mb-7">صفحات دیگر</h3>
                        <ul className="space-y-5 text-base xl:text-lg text-black/80">
                            <li>
                                <Link href="/" className="hover:text-primary transition">
                                    تماس با ما
                                </Link>
                            </li>
                            <li>
                                <Link href="/about-us" className="hover:text-primary transition">
                                    درباره ما
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="hover:text-primary transition">
                                    قرارداد
                                </Link>
                            </li>
                            <li>
                                <Link href="/booking" className="hover:text-primary transition">
                                    پشتیبانی
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="col-span-2 flex flex-col gap-6">
                    <h3 className="text-lg xl:text-xl font-bold text-center">
                        ما را در صفحات اجتماعی دنبال کنید
                    </h3>

                    <ul className="flex justify-center gap-2 items-center text-xs xl:text-sm text-black/80">
                        <li className="w-[45px] h-[45px] xl:w-[55px] xl:h-[55px] bg-secondary-500 rounded-full flex justify-center items-center">
                            <a href="#" className="flex justify-center items-center">
                                <Icon id="github" className="fill-white" />
                            </a>
                        </li>
                        <li className="w-[45px] h-[45px] xl:w-[55px] xl:h-[55px] bg-secondary-500 rounded-full flex justify-center items-center">
                            <a href="#" className="flex justify-center items-center">
                                <Icon id="facebook" className="fill-white" />
                            </a>
                        </li>
                        <li className="w-[45px] h-[45px] xl:w-[55px] xl:h-[55px] bg-secondary-500 rounded-full flex justify-center items-center">
                            <a href="#" className="flex justify-center items-center">
                                <Icon id="linkedin" className="fill-white" />
                            </a>
                        </li>
                        <li className="w-[45px] h-[45px] xl:w-[55px] xl:h-[55px] bg-secondary-500 rounded-full flex justify-center items-center">
                            <a href="#" className="flex justify-center items-center">
                                <Icon id="dribbble" className="fill-white" />
                            </a>
                        </li>

                        <li className="w-[45px] h-[45px] xl:w-[55px] xl:h-[55px] bg-secondary-500 rounded-full flex justify-center items-center">
                            <a href="#" className="flex justify-center items-center">
                                <Icon id="twitter" className="fill-white" />
                            </a>
                        </li>
                    </ul>

                    <div className="flex justify-center items-center">
                        <Image
                            src="/images/zarinpall.svg"
                            alt="logo"
                            width={67}
                            height={98}
                            className="w-[67px] h-[98px]"
                        />
                        <Image
                            src="/images/e-namad.svg"
                            alt="logo"
                            width={177}
                            height={96}
                            className="w-[177px] h-[96px]"
                        />
                    </div>
                </div>
            </div>




            <div className='md:hidden py-12'>
                <Image src="/images/logo.svg" alt="logo" width={100} height={100} className='w-[166px] h-[72px] mx-auto mb-5' />

                <Accordion type="multiple">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className='font-bold text-lg px-4'>توضیح کوتاه درباره زیر پله</AccordionTrigger>
                        <AccordionContent>
                            <p className='text-justify text-lg px-4'>
                                زیر پله یک پلتفرم آنلاین برای اجاره انواع کالا، خانه، خودرو و دیگر وسایل به‌صورت روزانه، ماهانه و سالانه است. کاربران می‌توانند به‌سادگی اقلام خود را برای اجاره ثبت کرده یا نیازهایشان را برطرف کنند.
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className='font-bold text-lg px-4'>صفحات دیگر</AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-5 text-lg text-black/80 px-4">
                                <li><Link href="/" className="hover:text-primary transition">تماس با ما</Link></li>
                                <li><Link href="/about-us" className="hover:text-primary transition">درباره ما</Link></li>
                                <li><Link href="/services" className="hover:text-primary transition">قرارداد</Link></li>
                                <li><Link href="/booking" className="hover:text-primary transition">پشتیبانی</Link></li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <div className='flex justify-center items-center mt-7'>
                    <Image src="/images/zarinpall.svg" alt="logo" width={100} height={100} className='w-[67px] h-[98px]' />
                    <Image src="/images/e-namad.svg" alt="logo" width={200} height={200} className='w-[177px] h-[96px]' />
                </div>
            </div>
        </div>
    )
}

export default Footer