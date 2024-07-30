import Footer from './footer'

import Image from 'next/image'

import background from '@/../public/images/game-background.png'

export default function GameBackground({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <nav className="shadow backdrop-blur w-full flex justify-center p-3 text-black *:drop-shadow-md font-medium text-xl">
        <li className="list-none">Games</li>
        <span className="mx-3">|</span>
        <li className="list-none">Studios</li>
        <span className="mx-3">|</span>
        <li className="list-none">About</li>
      </nav>
      <div className="absolute right-0 w-[40%] lg:w-fit top-0 -z-10">
        <Image quality={100} src={background} alt={'background'}></Image>
      </div>
      <div className="xl:p-10 sm:p-6 p-5 min-h-svh">{children}</div>
      <Footer />
    </>
  )
}
