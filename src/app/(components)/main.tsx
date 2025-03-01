import React from 'react'
import FeaturedContent from '../directory/games/featured-content'
import { Suspense } from 'react'
import { Lato } from 'next/font/google'

export default function Main({
  children,
  SideContent,
}: {
  children: React.ReactNode
  SideContent: React.ReactNode
}) {
  return (
    <>
      <section className="flex justify-evenly mb-5 items-center min-h-[350px] xl:gap-12 2xl:gap-24">
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
