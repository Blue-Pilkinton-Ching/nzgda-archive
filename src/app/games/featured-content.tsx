'use client'

import Link from 'next/link'
import { Game } from '../../../types'
import Image from 'next/image'
import urlName from '@/utils/client/get-url-friendly-name'
import charactors from '../../../public/images/game-characters.png'

import { getAllGames } from '@/api/games'
import { useEffect, useState } from 'react'
import CarouselArrow from './carousel-arrow'

export default function FeaturedContent() {
  const [featuredGames, setFeaturedGames] = useState<Game[]>()
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [wobble, setWobble] = useState({ active: false, direction: 'left' })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGames()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchGames() {
    let data: Game[]
    try {
      const games = await getAllGames()

      data = games.body as Game[]

      setFeaturedGames(data.filter((element) => element.featured))
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {featuredGames != undefined && featuredGames.length > 0 ? (
        <div className="justify-end xl:gap-8 gap-5 hidden lg:flex">
          <CarouselArrow
            isLeft={true}
            onClick={() => {
              setWobble({ active: true, direction: 'left' })
              setFeaturedIndex(
                (i) =>
                  ((i - 1 + featuredGames.length) % featuredGames.length) %
                  featuredGames.length
              )
              setTimeout(
                () => setWobble({ active: false, direction: 'left' }),
                400
              ) // Increased timeout
            }}
          />

          <div className="h-full max-h-[315px] xl:max-h-[min(27vw,450px)] ">
            <Link
              href={`/game/${featuredGames[featuredIndex].id}/${urlName(
                featuredGames[featuredIndex].name
              )}`}
              className="relative max-w-[80%] aspect-video"
            >
              <div
                className={`hover:scale-[1.02] active:scale-100 duration-100 ${
                  wobble.active
                    ? wobble.direction === 'left'
                      ? 'wobbleLeft'
                      : 'wobbleRight'
                    : ''
                }`}
              >
                <Image
                  quality={90}
                  src={
                    featuredGames[featuredIndex].banner ||
                    `https://placehold.co/800x450.jpg?text=${featuredGames[featuredIndex].name}`
                  }
                  alt="Placeholder"
                  height={450}
                  width={800}
                  className="shadow-md rounded-xl w-auto h-[20vw] lg:h-[22vw] aspect-video xl:h-[min(25vw,450px)]"
                ></Image>
                <div className="absolute w-full bottom-0 lg:h-[72px] h-14 bg-gradient-to-t from-10% via-75% from-maingreen/90 via-maingreen/75 0 to-maingreen/0 rounded-b-lg">
                  <div className="text-white drop-shadow-md translate-y-1 gap-1.5 flex text-center px-3 items-center justify-center w-full h-full my-auto text-2xl">
                    <p className="font-thin drop-shadow-md">Featured</p>
                    <p className="font-semibold drop-shadow-md">Game</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <CarouselArrow
            isLeft={false}
            onClick={() => {
              setWobble({ active: true, direction: 'right' })
              setFeaturedIndex((i) => (i + 1) % featuredGames.length)
              setTimeout(
                () => setWobble({ active: false, direction: 'right' }),
                400
              ) // Increased timeout
            }}
          />
        </div>
      ) : loading ? null : (
        <div className="xl:mr-44 lg:mr-[12%] my-16 hidden sm:block float-right">
          <Image
            quality={75}
            src={charactors}
            alt="game-characters"
            width={400}
          ></Image>
        </div>
      )}
    </>
  )
}
