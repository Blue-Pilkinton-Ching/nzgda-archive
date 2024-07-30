import React from 'react'

import Image from 'next/image'
import banner from '../../../public/images/banner-split.png'
import logo from '../../../public/images/NZGDA.png'
import Link from 'next/link'

export default function Header() {
  return (
    <div className="justify-center flex">
      <div className="flex justify-between items-center min-w-[240%] sm:min-w-[1280px]">
        <div className="w-[40%]">
          <Image quality={100} src={banner} alt={'Background'} priority></Image>
        </div>
        <div className="absolute w-[40%] min-w-16 sm:w-56 2xl:w-72 left-[50vw] hover:scale-110 duration-100 hover:rotate-6 active:scale-95 -active:rotate-6 -translate-x-1/2">
          <Link href={'/games'} className="">
            <Image quality={100} src={logo} alt={'Background'}></Image>
          </Link>
        </div>
        <div className="w-[40%]">
          <Image quality={100} src={banner} alt={'Background'}></Image>
        </div>
      </div>
    </div>
  )
}
