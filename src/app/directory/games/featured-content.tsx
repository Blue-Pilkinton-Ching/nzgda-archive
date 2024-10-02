'use client'

import Link from 'next/link'
import { Game, Studio } from '../../../../types'
import Image from 'next/image'
import urlName from '@/utils/client/get-url-friendly-name'
import charactors from '../../../../public/images/game-characters.png'

import { getAllGames } from '@/api/games'
import { useEffect, useState } from 'react'
import CarouselArrow from './carousel-arrow'
import { getAllStudios, getStudioByID } from '@/api/studios'

export default function FeaturedContent() {
  const [featuredGames, setFeaturedGames] = useState<Game[]>()
  const [studios, setStudios] = useState<Studio[]>()
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [wobble, setWobble] = useState({ active: false, direction: 'left' })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGames()
    getStudios()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function getStudios() {
    let data: Studio[]

    try {
      const studios = await getAllStudios()

      data = studios.body as Studio[]

      setStudios(data)
    } catch (error) {
      console.error(error)
    }
  }

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
          {featuredGames.length > 1 ? (
            <CarouselArrow
              isLeft={true}
              onClick={() => {
                setWobble({ active: true, direction: 'right' })
                setFeaturedIndex(
                  (i) => ((i + 1) % featuredGames.length) % featuredGames.length
                )
                setTimeout(
                  () => setWobble({ active: false, direction: 'right' }),
                  400
                ) // Increased timeout
              }}
            />
          ) : null}

          <div className="relative h-full max-h-[315px] xl:max-h-[min(27vw,450px)] ">
            <Link
              href={`/game/${featuredGames[featuredIndex].id}/${urlName(
                featuredGames[featuredIndex].name
              )}`}
              className=" max-w-[80%]"
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
                {featuredGames[featuredIndex].banner ? (
                  <div className="shadow-md aspect-video rounded-xl w-auto h-[20vw] lg:h-[22vw] xl:h-[min(25vw,450px)]">
                    <Image
                      src={featuredGames[featuredIndex].banner}
                      alt={featuredGames[featuredIndex].name}
                      layout="fill"
                    />
                  </div>
                ) : (
                  <iframe
                    src={featuredGames[featuredIndex].url as string}
                    className="shadow-md aspect-video rounded-xl w-auto h-[20vw] lg:h-[22vw] xl:h-[min(25vw,450px)]"
                  ></iframe>
                )}
                <div className="flex items-center absolute w-full bottom-0 lg:h-[72px] h-14 bg-gradient-to-t from-10% via-75% from-mainred/90 via-mainred/75 0 to-mainred/0 rounded-b-lg">
                  <div className="text-white overflow-hidden translate-y-1 px-3 w-full text-2xl">
                    <div className="whitespace-nowrap text-center overflow-hidden text-ellipsis">
                      <span className="font-thin">
                        {featuredGames[featuredIndex].name}
                      </span>
                      {studios && (
                        <strong className="font-semibold">
                          {' '}
                          By{' '}
                          {
                            studios.find(
                              (x) =>
                                x.id === featuredGames[featuredIndex].studio_id
                            )?.name
                          }
                        </strong>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          {featuredGames.length > 1 ? (
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
          ) : null}
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
