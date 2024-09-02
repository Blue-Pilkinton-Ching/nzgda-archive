import React from 'react'
import FeaturedContent from '../directory/games/featured-content'
import { Suspense } from 'react'
import { Lato } from 'next/font/google'

const lato = Lato({ weight: '400', subsets: ['latin'] })

export default function Main({
  children,
  SideContent,
}: {
  children: React.ReactNode
  SideContent: React.ReactNode
}) {
  return (
    <>
      <section className="flex justify-evenly mb-5 items-center min-h-[350px]">
        {SideContent}
        <div className="hidden md:block">
          <FeaturedContent />
        </div>
      </section>
      <section>
        <Suspense>{children}</Suspense>
      </section>
    </>
  )
}
