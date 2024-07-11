'use client'

import Link from 'next/link'
import { Game } from '../../../types'
import Image from 'next/image'
import urlName from '@/utils/client/get-url-friendly-name'
import charactors from '../../../public/images/game-characters.png'

import { getAllGames } from '@/api/games'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function FeaturedContent() {
  const [featuredGames, setFeaturedGames] = useState<Game[]>()

  const { admin } = useParams()

  useEffect(() => {
    fetchGames()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchGames() {
    let data: Game[]
    try {
      const games = await getAllGames()

      data = games.body as Game[]

      if (admin === 'true') {
        setFeaturedGames(data.filter((element) => element.featured))
      } else {
        setFeaturedGames(
          data.filter((element) => element.featured && element.approved)
        )
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {featuredGames != undefined && featuredGames.length > 0 ? (
        <div className="aspect-video h-full w-full max-h-[315px] xl:max-h-[min(27vw,450px)] hidden lg:block">
          {/* <Link href={`/game/${feature.id}/${urlName(feature.name)}`}> */}
          <Link href={`#`}>
            <div className="relative aspect-video max-h-[315px] xl:max-h-[min(27vw,450px)] lg:h-full xl:h-[min(27vw,450px)] float-right hover:scale-[1.03] active:scale-100 duration-100">
              <Image
                quality={90}
                src={
                  featuredGames[0].banner ||
                  `https://placehold.co/800x450.jpg?text=Placeholder`
                }
                alt="Placeholder"
                height={450}
                width={800}
                className="shadow-md rounded-xl w-auto h-full aspect-video lg:h-full xl:h-[min(27vw,450px)]"
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
      ) : (
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
