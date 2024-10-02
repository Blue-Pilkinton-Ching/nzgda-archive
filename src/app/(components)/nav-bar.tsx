'use client'

import * as React from 'react'
import { Lato } from 'next/font/google'
import { usePathname } from 'next/navigation'

const lato = Lato({ weight: '300', subsets: ['latin'] })

export function NavBar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-row">
      <li className="list-none active:scale-90 hover:scale-110 hover:text-mainred duration-200">
        <a
          href={`/directory/games`}
          className={`${
            pathname === '/directory/games' || pathname.startsWith('/game/')
              ? 'underline'
              : ''
          } underline-offset-2 decoration-1 ${lato.className} `}
        >
          GAMES
        </a>
      </li>
      <span className={`mx-3 ` + lato.className}>|</span>
      <li className="list-none active:scale-90 hover:scale-110 hover:text-mainred duration-200">
        <a
          href="/directory/studios"
          className={`${
            pathname === '/directory/studios' || pathname.startsWith('/studio/')
              ? 'underline'
              : ''
          } underline-offset-2 decoration-1 ${lato.className} `}
        >
          STUDIOS
        </a>
      </li>
      <span className={`mx-3 ` + lato.className}>|</span>
      <li className="list-none active:scale-90 hover:scale-110 hover:text-mainred duration-200">
        <a
          href="/directory/about"
          className={`${
            pathname === '/directory/about' ||
            pathname.startsWith('/directory/about/')
              ? 'underline'
              : ''
          } underline-offset-2 decoration-1 ${lato.className} `}
        >
          ABOUT
        </a>
      </li>
    </div>
  )
}
