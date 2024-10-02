import Footer from './footer'
import Image from 'next/image'
import background from '@/../public/images/game-background.png'
import { NavBar } from './nav-bar'

export default function GameBackground({
  children,
  navBarChildren,
}: {
  children: React.ReactNode
  navBarChildren?: React.ReactNode
}) {
  return (
    <>
      <nav
        className={`px-3 bg-white w-full flex justify-center sm:justify-between h-12 items-center text-black shadow font-medium text-xl`}
      >
        <NavBar />
        {navBarChildren}
      </nav>
      <div className="absolute right-0 w-[40%] lg:w-fit top-0 -z-10">
        <Image quality={100} src={background} alt={'background'}></Image>
      </div>
      <div className="absolute left-0 w-[40%] lg:w-fit top-0 -z-10">
        <Image
          quality={100}
          src={background}
          alt={'background'}
          className="-scale-x-100 -translate-x-[40%] -rotate-12 -translate-y-[60%]"
        ></Image>
      </div>
      <div className="xl:p-10 sm:p-6 p-5 min-h-svh">{children}</div>
      <Footer />
    </>
  )
}
