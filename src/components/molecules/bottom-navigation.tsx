'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Icon } from '../atoms/icon';

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
            <Icon id='home-fiil' className='w-6 h-6 fill-amber-300 ' />

        ),
    },
    {
        label: 'دسته ها',
        href: '/categories',
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 4H4v6h6V4zm0 10H4v6h6v-6zm10-10h-6v6h6V4zm0 10h-6v6h6v-6z" />
            </svg>
        ),
        activeIcon: (
            <Icon id='home' className='w-6 h-6 fill-primary-700' />
        ),
    },
    {
        label: 'ثبت آگهی',
        href: '/post',
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        ),
        activeIcon: (
            <Icon id='home' className='w-6 h-6 fill-primary-700' />
        ),
    },
    {
        label: 'مدیریت آگهی',
        href: '/ads',
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 13h2v-2H3v2zm4 0h2v-2H7v2zm4 0h2v-2h-2v2zM3 17h2v-2H3v2zm4 0h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h6v-2h-6v2z" />
            </svg>
        ),
        activeIcon: (
            <Icon id='home' className='w-6 h-6 fill-primary-700' />
        ),
    },
    {
        label: 'حساب من',
        href: '/profile',
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
        ),
        activeIcon: (
            <Icon id='home' className='w-6 h-6 fill-primary-700' />
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
                        <a
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-600'
                                }`}
                        >
                            {isActive ? item.activeIcon : item.icon}
                            <Icon id='home-fill' className='w-4 h-4 fill-amber-300 ' />
                            <span className="mt-1">{item.label}</span>
                        </a>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNavigation;
