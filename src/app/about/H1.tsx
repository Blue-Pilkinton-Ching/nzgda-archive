import React from 'react'
import Image from 'next/image'

import back from '../../../public/images/back.svg'
import Link from 'next/link'

export default function H1({
  children,
  href = '',
}: {
  children: React.ReactNode
  href?: string
}) {
  return (
    <h1 className="text-3xl font-bold mb-3 flex items-center justify-center">
      <Link
        className="hover:scale-125 active:scale-95 duration-100 hover:rotate-12 active:-rotate-12 flex items-center  mr-4"
        href={href || '/about'}
      >
        <Image src={back} alt={'back'} className="w-11 h-12"></Image>{' '}
      </Link>
      {children}
    </h1>
  )
}
