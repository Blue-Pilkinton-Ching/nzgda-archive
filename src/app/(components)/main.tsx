import React from 'react'
import FeaturedContent from '../games/featured-content'
import GameBackground from './game-background'
import Image from 'next/image'
import { Suspense } from 'react'
import logo from '../../../public/images/NZGDA.png'

export default function Main({
  children,
  description,
  hideFeaturedContent = false,
  title = '',
  studio = false,
}: {
  children: React.ReactNode
  description: React.ReactNode
  hideFeaturedContent?: boolean
  title?: string
  studio?: boolean
}) {
  return (
    <>
      <GameBackground bothsides>
        <section className="flex justify-between mb-5 sm:min-h-[350px]">
          <div
            className={
              studio
                ? 'justify-evenly flex-1 flex flex-col gap-5'
                : 'flex flex-col h-full xl:py-5 lg:w-[800px] xl:w-[900px] lg:h-[22vw] w-full aspect-video xl:h-[min(25vw,450px)]'
            }
          >
            <div
              className={
                studio
                  ? 'min-w-[240px] lg:max-w-[40vw]'
                  : 'lg:w-[350px] min-w-[240px] w-full h-[50%] items-center flex mb-3 drop-shadow-md'
              }
            >
              {studio ? (
                <h1 className="drop-shadow-md text-7xl text-mainred font-bold">
                  {title}
                </h1>
              ) : (
                <Image
                  quality={100}
                  src={logo}
                  alt="logo"
                  className="w-[80%] sm:mx-0 mx-auto min-w-[280px] xl:w-full drop-shadow-md"
                ></Image>
              )}
            </div>
            <div className="max-w-[min(calc(100vw-40px),500px)] w-max lg:w-auto text-lg text-justify sm:text-start">
              {description}
            </div>
          </div>
          {hideFeaturedContent ? null : (
            <div className="w-full hidden sm:block">
              <FeaturedContent />
            </div>
          )}
        </section>
        <section>
          <Suspense>{children}</Suspense>
        </section>
      </GameBackground>
    </>
  )
}
