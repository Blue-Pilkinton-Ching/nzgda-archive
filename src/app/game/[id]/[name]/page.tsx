'use client'

import { useEffect, useRef, useState } from 'react'
import { Game } from '../../../../../types'
import { useParams } from 'next/navigation'
import Image from 'next/image'

import logo from '../../../../../public/images/NZGDA.png'
import Link from 'next/link'

import back from '../../../../../public/images/back.svg'
import '@/utils/client/firebase'
import GameSection from '@/app/directory/games/gamesection'
import { getAllGames } from '@/api/games'
import { getGameByID } from '@/api/game'
import PageLink from '@/app/(components)/page-link'
import { TfiWorld } from 'react-icons/tfi'
import { FaSteam } from 'react-icons/fa6'
import { FaAppStoreIos, FaGooglePlay } from 'react-icons/fa'
import type { Link as LinkType } from '@/../types'

export default function Page() {
  const [game, setGame] = useState<Game | null>()
  const [games, setGames] = useState<Game[]>()
  const [error, setError] = useState('')
  const gameView = useRef<HTMLIFrameElement>(null)
  const [isFullscreen, setFullscreen] = useState(false)
  const [iosFullscreen, setIOSFullscreen] = useState(false)
  const [links, setLinks] = useState<LinkType[]>([])

  const params = useParams<{ id: string }>()

  useEffect(() => {
    document.addEventListener('fullscreenchange', onFullscreenChange)

    getGame()
    fetchGames()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchGames() {
    try {
      let res = await getAllGames()
      setGames(res.body.filter((x: Game) => x.approved))
    } catch (error) {
      console.error(error)
      setError('Failed to fetch games :(')
    }
  }

  function onFullscreenChange() {
    setFullscreen(document.fullscreenElement != null)
  }

  async function getGame() {
    try {
      const res = await getGameByID(Number(params.id))

      setGame(res.body)

      const links = res.body.otherLinks

      if (links) {
        setLinks(await JSON.parse(links))
      }
    } catch (error) {
      console.error(error)
      setError('Failed to fetch Game :(')
      return
    }
  }

  if (error) {
    return <p className="text-5xl font-semibold text-mainred">{error}</p>
  }

  if (!game) {
    return (
      <p className="text-5xl font-semibold text-mainred">Fetching Game...</p>
    )
  }

  const iframeStyles = iosFullscreen
    ? {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        width: '100vw',
        height: 'min(calc(100vw / 1.7777777778),100vh)',
        zIndex: 9999,
      }
    : {
        maxWidth: isFullscreen ? '100%' : game.width || undefined,
        maxHeight:
          game.height && game.height < 800
            ? game.height
            : isFullscreen
            ? 'calc(100vh - 64px)'
            : 800,
      }

  const containerStyles = {
    maxWidth: isFullscreen
      ? 'calc((100vh - 64px) * 1.7778)'
      : game.width || undefined,
  }

  return (
    <>
      <div className="flex items-center xl:min-h-[calc(100vh-80px-48px)] xl:mb-10 min-h-[calc(100vh-40px-48px)] mb-5">
        <div className="flex flex-1 flex-col-reverse xl:flex-row justify-evenly items-start gap-4 xl:gap-10 *:max-w-[800px] *:xl:max-w-none ">
          <div className="space-y-6 xl:min-w-[500px] xl:w-[500px] flex justify-center flex-col">
            <h1 className="sm:text-5xl text-3xl text-mainred font-semibold text-wrap flex items-center">
              {/* <Link
                className="hover:scale-125 active:scale-95 duration-100 hover:rotate-12 active:-rotate-12 flex items-center mr-5 w-full max-w-12"
                href={'/games'}
              >
                <Image src={back} alt={'back'}></Image>
              </Link> */}
              {game.name}
            </h1>
            <p className="sm:text-xl text-lg whitespace-pre-line text-justify">
              {game.description}
            </p>
            <p className="text-lg">Year of Release: {game.yearOfRelease}</p>
            <div className="flex flex-col gap-5">
              <div className="flex gap-3 items-center justify-center flex-row flex-wrap">
                {game.iosLink && (
                  <PageLink href={game.iosLink || ''} text="Play Store">
                    <FaAppStoreIos size={24} />
                  </PageLink>
                )}
                {game.androidLink && (
                  <PageLink href={game.androidLink || ''} text="App Store">
                    <FaGooglePlay size={24} />
                  </PageLink>
                )}
                {game.websiteLink && (
                  <PageLink href={game.websiteLink || ''} text="Website">
                    <TfiWorld size={24} />
                  </PageLink>
                )}
                {game.steamLink && (
                  <PageLink href={game.steamLink || ''} text="Steam">
                    <FaSteam size={24} />
                  </PageLink>
                )}
                {links &&
                  links.map((link) => (
                    <>
                      <PageLink
                        href={link.url}
                        text={link.label}
                        key={link.label}
                      ></PageLink>
                    </>
                  ))}
              </div>
            </div>
            {/* <div className="flex justify-center gap-8">
              {game.androidLink ? (
                <div>
                  <Link href={game.androidLink} target="_blank">
                    <Image
                      src={google}
                      alt={'Download on Android'}
                      className="pt-px"
                    ></Image>
                  </Link>
                </div>
              ) : (
                ''
              )}
              {game.iosLink ? (
                <div>
                  <Link href={game.iosLink} target="_blank">
                    <Image src={apple} alt={'Download on IOS'}></Image>
                  </Link>
                </div>
              ) : (
                ''
              )}
            </div> */}
          </div>
          <div
            ref={gameView}
            style={{
              maxWidth: game.width && game.width < 1422 ? game.width : 1422,
              maxHeight: game.height && game.height < 800 ? game.height : 800,
            }}
            className="justify-center w-full xl:w-auto items-center aspect-video xl:flex-grow relative flex flex-col box-content rounded-lg *:rounded-lg"
          >
            {game.url ? (
              <>
                <iframe
                  src={game.url}
                  allowFullScreen
                  className="w-full shadow-lg overflow-hidden aspect-video"
                  style={iframeStyles}
                  scrolling="no"
                  id="heihei-game"
                  frameBorder={0}
                ></iframe>
                <div
                  style={containerStyles}
                  className="w-full h-16 flex justify-between flex-row-reverse items-center px-3"
                >
                  <button
                    onClick={() => {
                      setFullscreen((old) => {
                        if (old) {
                          try {
                            document.exitFullscreen()
                          } catch (error) {
                            setIOSFullscreen(false)
                            console.error(error)
                          }
                        } else {
                          try {
                            gameView.current?.requestFullscreen()
                          } catch (error) {
                            setIOSFullscreen(true)
                            console.error(error)
                          }
                        }
                        return !old
                      })

                      gameView.current?.requestFullscreen()
                    }}
                    className="flex bg-mainred h-9 w-40 rounded-full items-center justify-center hover:scale-105 duration-100 active:scale-95"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="white"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="-pl-0.5 w-7 h-7"
                    >
                      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path>
                    </svg>
                    <p className="font-semibold text-white pt-0.5 ">
                      {isFullscreen ? 'EXIT' : 'FULLSCREEN'}
                    </p>
                  </button>
                  <div className="w-24 h-12 flex items-center">
                    <Image quality={10} src={logo} alt={'logo'}></Image>
                  </div>
                </div>
              </>
            ) : game.banner ? (
              <div className="w-full h-full shadow-lg rounded-xl">
                <Image
                  src={game.banner}
                  quality={100}
                  fill
                  alt={'game visual'}
                  className="w-full h-auto shadow-lg rounded-xl"
                ></Image>
              </div>
            ) : (
              <p className="text-5xl font-semibold text-mainred">
                Game doesn&apos;t exist!
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="w-full my-5 xl:my-10">
        {/* <hr className="w-[80%] lg:w-[90%] mx-auto border-maingreen" /> */}
        <h1 className="sm:text-4xl lg:px-7 text-3xl text-mainred font-semibold text-wrap flex items-center">
          More Games you&apos;ll love!
        </h1>
        {games ? (
          <GameSection
            scrollable
            smallTitle={``}
            largeTitle={``}
            games={games.sort(
              (a, b) =>
                (b.sort ? b.sort : b.id * 100) - (a.sort ? a.sort : a.id * 100)
            )}
          />
        ) : null}
      </div>
    </>
  )
}
