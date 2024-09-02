import * as React from 'react'
import Image from 'next/image'
import logo from '../../../public/images/NZGDA.png'

import { Lato } from 'next/font/google'

const lato = Lato({ weight: '400', subsets: ['latin'] })

export interface ISideContentProps {}

export function SideContent(props: ISideContentProps) {
  return (
    <div className="flex-1">
      <div className="lg:w-[350px] min-w-[240px] w-full h-[50%] items-center flex drop-shadow mb-8">
        <div className="flex flex-col mx-auto sm:mx-0">
          <Image
            quality={100}
            src={logo}
            alt="logo"
            className="w-[80%] sm:w-auto sm:mx-0 mx-auto md:min-w-[350px] xl:w-full drop-shadow"
          ></Image>
          <div
            className={`text-3xl pt-4 justify-between flex w-full ${lato.className} text-mainred `}
          >
            <span>G</span>
            <span>A</span>
            <span>M</span>
            <span>E</span>
            <span>S</span>
            <span className="w-3"></span>
            <span>D</span>
            <span>I</span>
            <span>R</span>
            <span>E</span>
            <span>C</span>
            <span>T</span>
            <span>O</span>
            <span>R</span>
            <span>Y</span>
          </div>
        </div>
      </div>
      <div className="w-full md:max-w-[min(calc(100vw-40px),500px)] lg:w-auto sm:text-xl text-lg text-justify sm:text-start">
        <>
          The NZGDA games directory is the official archive of New Zealand made
          video games. <br />
          <br />
          Discover our games and the kiwi companies that made them.
        </>
      </div>
    </div>
  )
}
