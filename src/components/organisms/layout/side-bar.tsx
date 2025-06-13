import { Icon } from '@/components/atoms/icon'
import Link from 'next/link'
import React from 'react'
import { IconName } from '../../../../public/icons/name'

function SideBar() {
    const sidebarItem = [
        { id: 1, name: "خانه", icon: "home", href: "/" },
        { id: 2, name: "مدیریت آگهی ها", icon: "widgets", href: "/" },
        { id: 3, name: "قرارداد ها", icon: "description", href: "/" },
        { id: 4, name: "علاقه مندی ها", icon: "favorite", href: "/" },
        { id: 5, name: "اعلان ها", icon: "alert", href: "/" },
        { id: 6, name: "پروفایل", icon: "person", href: "/" },
        { id: 7, name: "ثبت کسب و کار", icon: "business_center", href: "/" },
    ]
    return (
        <div className='w-[290px] h-[566px] flex flex-col justify-between  lg:border rounded-2xl p-4 py-6 '>
            <div className='w-full'>
                <h3 className='font-bold text-xl mb-4'>پنل کاربری</h3>

                <ul className='text-lg w-fill flex flex-col gap-1'>
                    {
                        sidebarItem.map(item =>

                            <li className='w-full'>
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className="group w-full flex gap-2 items-center hover:bg-primary-200 rounded-md px-2 py-3 hover:text-primary transition-all duration-200 hover:border-b-3 hover:border-primary"
                                >
                                    <Icon id={item.icon as IconName} size={20} className="fill-black w-5 h-5 group-hover:fill-primary transition-all duration-200" />
                                    <span>{item.name}</span>
                                </Link>

                            </li>

                        )
                    }

                </ul>
            </div>



            <p className='fixed right-4 bottom-6 lg:relative lg:right-0 lg:bottom-0 text-[#FF3E3E] text-lg flex items-center gap-2 cursor-pointer'>
                <Icon id="logout" className='fill-[#FF3E3E]' />
                <span>خروج از حساب کاربری</span>
            </p>
        </div>
    )
}

export default SideBar