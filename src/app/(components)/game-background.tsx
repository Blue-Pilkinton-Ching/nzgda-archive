import Footer from './footer'
import Image from 'next/image'
import background from '@/../public/images/game-background.png'

import { Lato } from 'next/font/google'

const lato = Lato({ weight: '400', subsets: ['latin'] })

export default async function GameBackground({
  children,
  bothsides = false,
  selectedMenu,
}: {
  children: React.ReactNode
  bothsides?: boolean
  selectedMenu?: 'games' | 'studios'
}) {
  return (
    <>
      <nav
        className={`px-3 bg-white w-full flex justify-center sm:justify-start h-12 active:*:scale-90 items-center hover:*:scale-110 hover:*:text-mainred *:duration-200 text-black shadow font-medium text-xl`}
      >
        <li className="list-none">
          <a
            href={`/games`}
            className={`${
              selectedMenu === 'games' ? 'underline' : ''
            } underline-offset-4 ${lato.className} `}
          >
            GAMES
          </a>
        </li>
        <span className={`mx-3 ` + lato.className}>|</span>
        <li className="list-none">
          <a
            href="/studios"
            className={`${
              selectedMenu === 'studios' ? 'underline' : ''
            } underline-offset-4 ${lato.className} `}
          >
            STUDIOS
          </a>
        </li>
        <span className={`mx-3 ` + lato.className}>|</span>
        <li className="list-none">
          <a href="/about" className={`${lato.className} underline-offset-4`}>
            ABOUT
          </a>
        </li>
      </nav>
      <div className="absolute right-0 w-[40%] lg:w-fit top-0 -z-10">
        <Image quality={100} src={background} alt={'background'}></Image>
      </div>
      {bothsides ? (
        <div className="absolute left-0 w-[40%] lg:w-fit top-0 -z-10">
          <Image
            quality={100}
            src={background}
            alt={'background'}
            className="-scale-x-100 -translate-x-[40%] -rotate-12 -translate-y-[60%]"
          ></Image>
        </div>
      ) : null}
      <div className="xl:p-10 sm:p-6 p-5 min-h-svh">{children}</div>
      <Footer />
    </>
  )
}
