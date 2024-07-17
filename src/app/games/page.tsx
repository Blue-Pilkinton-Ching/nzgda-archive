import Image from 'next/image'

import logo from '../../../public/images/NZGDA.png'
import Games from './games'
import { Suspense } from 'react'
import GameBackground from '../(components)/game-background'
import FeaturedContent from './featured-content'

export default function Page() {
  return (
    <>
      <GameBackground>
        <section className="flex justify-between items-center mb-5 sm:min-h-[300px]">
          <div className="flex flex-col h-full xl:py-5 lg:w-[800px] xl:w-[900px] lg:h-[22vw] w-full aspect-video xl:h-[min(25vw,450px)]">
            <div className="lg:w-[350px] min-w-[240px] w-full h-[50%] items-center flex mb-3">
              <Image
                quality={100}
                src={logo}
                alt="logo"
                className="w-[80%] sm:mx-0 mx-auto min-w-[280px] xl:w-full drop-shadow-md"
              ></Image>
            </div>
            <p className="max-w-[min(calc(100vw-40px),500px)] w-max lg:w-auto text-lg text-justify sm:text-start">
              The NZGDA games directory is the official archive of New Zealand
              made video games. <br />
              <br />
              Discover our games and the kiwi companies that made them.
            </p>
          </div>
          <div className="w-full hidden sm:block">
            <FeaturedContent />
          </div>
        </section>
        <section>
          <Suspense>
            <Games />
          </Suspense>
        </section>
      </GameBackground>
    </>
  )
}
