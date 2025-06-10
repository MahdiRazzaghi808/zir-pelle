'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Icon } from '../atoms/icon';
import Link from 'next/link';

type NavItem = {
    label: string;
    icon: JSX.Element;
    activeIcon: JSX.Element;
    href: string;
};

const navItems: NavItem[] = [
    {
        label: 'خانه',
        href: '/',
        icon: (
            <Icon id='home' className='w-6 h-6 fill-[#D9D9D9]' />
        ),
        activeIcon: (
            <Icon id='home-fill' className='w-6 h-6' />
        ),
    },
    {
        label: 'دسته ها',
        href: '/categories',
        icon: (
            <Icon id='category' className='w-6 h-6 fill-[#D9D9D9]' />
        ),
        activeIcon: (
            <Icon id='category-fill' className='w-6 h-6' />
        ),
    },
    {
        label: 'ثبت آگهی',
        href: '/post',
        icon: (
            <Icon id='add_notes' className='w-6 h-6 fill-[#D9D9D9]' />

        ),
        activeIcon: (
            <Icon id='add_notes-fill' className='w-6 h-6' />
        ),
    },
    {
        label: 'مدیریت آگهی',
        href: '/ads',
        icon: (
            <Icon id='widgets' className='w-6 h-6 fill-[#D9D9D9]' />
        ),
        activeIcon: (
            <Icon id='widgets' className='w-6 h-6 fill-[#D9D9D9]' />
        ),
    },
    {
        label: 'حساب من',
        href: '/profile',
        icon: (
            <Icon id='person' className='w-6 h-6 fill-[#D9D9D9]' />
        ),
        activeIcon: (
            <Icon id='person-fill' className='w-6 h-6 ' />
        ),
    },
];

const BottomNavigation: React.FC = () => {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow z-50 md:hidden">
            <div className="flex justify-around items-center py-2 text-xs text-gray-700">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-600'
                                }`}
                        >
                            {isActive ? item.activeIcon : item.icon}
                            <span className="mt-1">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNavigation;
