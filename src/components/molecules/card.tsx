import Image from 'next/image'
import React from 'react'

function Card() {
    return (
        <div className='w-[174px] h-[242px] border rounded-2xl p-3'>
            <Image src="/images/product.png" alt='product' width={228} height={171} className='rounded-2xl ' />
            <h6 className='text-[13px] mt-2 mb-1 font-extrabold'>کفش چرمی مشکی مجلسی سایز ۴۳ برند چرم تبریز ... </h6>
            <p className='text-xs flex gap-0.5 items-center text-primary'>
                <span className='font-semibold text-[13px]'>۴۰۰،۰۰۰</span>
                <span className='text-[11px]'>تومان</span>
                <span className='text-[10px] text-black/40'>/ روز</span>
            </p>
        </div>
    )
}

export default Card
