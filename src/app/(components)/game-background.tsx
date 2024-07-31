import Footer from './footer'

import Image from 'next/image'

import background from '@/../public/images/game-background.png'

export default function GameBackground({
  children,
  bothsides = false,
}: {
  children: React.ReactNode
  bothsides?: boolean
}) {
  return (
    <>
      <nav className="shadow backdrop-blur w-full flex justify-center h-12 active:*:scale-90 items-center hover:*:scale-110 hover:*:text-mainred *:duration-200 text-black *:drop-shadow-md font-medium text-xl">
        <li className="list-none">
          <a href="">GAMES</a>
        </li>
        <span className="mx-3">|</span>
        <li className="list-none">
          <a href="/studios">STUDIOS</a>
        </li>
        <span className="mx-3">|</span>
        <li className="list-none">
          <a href="/about">ABOUT</a>
        </li>
      </nav>
      <div className="absolute right-0 w-[40%] lg:w-fit top-0 -z-10">
        <Image quality={100} src={background} alt={'background'}></Image>
      </div>{' '}
      {bothsides ? (
        <div className="absolute left-0 w-[40%] lg:w-fit top-0 -z-10">
          <Image
            quality={100}
            src={background}
            alt={'background'}
            className="-scale-x-100 -translate-x-1/2 -translate-y-1/2"
          ></Image>
        </div>
      ) : null}
      <div className="xl:p-10 sm:p-6 p-5 min-h-svh">{children}</div>
      <Footer />
    </>
  )
}
