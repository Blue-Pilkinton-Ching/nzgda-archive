'use client'

import * as React from 'react'
import { Lato } from 'next/font/google'
import { usePathname } from 'next/navigation'

const lato = Lato({ weight: '400', subsets: ['latin'] })

export function NavBar() {
  const pathname = usePathname()

  return (
    <>
      <li className="list-none">
        <a
          href={`/directory/games`}
          className={`${
            pathname === '/directory/games' || pathname.startsWith('/game/')
              ? 'underline'
              : ''
          } underline-offset-4 ${lato.className} `}
        >
          GAMES
        </a>
      </li>
      <span className={`mx-3 ` + lato.className}>|</span>
      <li className="list-none">
        <a
          href="/directory/studios"
          className={`${
            pathname === '/directory/studios' || pathname.startsWith('/studio/')
              ? 'underline'
              : ''
          } underline-offset-4 ${lato.className} `}
        >
          STUDIOS
        </a>
      </li>
      <span className={`mx-3 ` + lato.className}>|</span>
      <li className="list-none">
        <a
          href="/directory/about"
          className={`${
            pathname === '/directory/about' ? 'underline' : ''
          } underline-offset-4 ${lato.className} `}
        >
          ABOUT
        </a>
      </li>
    </>
  )
}
