import React from 'react'
import FeaturedContent from '../games/featured-content'
import Image from 'next/image'
import { Suspense } from 'react'
import logo from '../../../public/images/NZGDA.png'
import { Lato } from 'next/font/google'

const lato = Lato({ weight: '400', subsets: ['latin'] })

export default function Main({
  children,
  description,
  hideFeaturedContent = false,
  dontDisplayLogo = false,
  title = '',
  studio = false,
}: {
  children: React.ReactNode
  description: React.ReactNode
  hideFeaturedContent?: boolean
  dontDisplayLogo?: boolean
  title?: string
  studio?: boolean
}) {
  return (
    <>
      <section className="flex justify-evenly mb-5 items-center min-h-[350px]">
        <div
          className={
            studio
              ? 'justify-evenly flex-1 flex flex-col gap-5'
              : 'flex flex-col xl:py-5 lg:w-[800px] xl:w-[900px] lg:h-[22vw] w-full xl:min-h-[min(25vw,450px)]'
          }
        >
          <div
            className={
              studio
                ? 'min-w-[240px] lg:max-w-[40vw]'
                : 'lg:w-[350px] min-w-[240px] w-full h-[50%] items-center flex drop-shadow mb-8'
            }
          >
            {title ? (
              <h1 className="drop-shadow-md sm:text-7xl text-5xl text-mainred text-center sm:text-start font-bold">
                {title}
              </h1>
            ) : (
              <>
                {!dontDisplayLogo && (
                  <>
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
                  </>
                )}
              </>
            )}
          </div>
          <div className="w-full md:max-w-[min(calc(100vw-40px),500px)] lg:w-auto sm:text-xl text-lg text-justify sm:text-start">
            {description}
          </div>
        </div>
        {hideFeaturedContent ? null : (
          <div className="w-full hidden md:block">
            <FeaturedContent />
          </div>
        )}
      </section>
      <section>
        <Suspense>{children}</Suspense>
      </section>
    </>
  )
}
