'use client'

import { Studio, Game } from '../../../types'
import React, { useEffect, useState } from 'react'

import '@/utils/client/firebase'
import Dropdown from '../(components)/dropdown'
import { useSearchParams } from 'next/navigation'
import GameSection from './gamesection'
import { IconButton } from '../(components)/iconButton'
import { IoSchool, IoSchoolOutline } from 'react-icons/io5'
import { getAllPublicGames } from '@/api/games'

export default function Games() {
  const [error, setError] = useState('')

  const [games, setGames] = useState<Game[]>([])
  const [studios, setStudios] = useState<Studio[]>([])
  const [partner, setPartner] = useState<string | null>()

  const [admin, setAdmin] = useState<boolean>()

  const [educational, setEducational] = useState(false)

  const params = useSearchParams()

  useEffect(() => {
    fetchGames()
    setPartner(params.get('partner'))
    setAdmin(params.get('admin') === 'true' || false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  async function fetchGames() {
    // let data: Game[]
    // try {
    //   data = await getAllPublicGames()
    //   setGames(data)
    // } catch (error) {
    //   console.error(error)
    //   setError('Failed to fetch games :(')
    // }
  }

  const isMobile = () => {
    const userAgent = navigator.userAgent
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent
    )
  }

  return (
    <>
      {games ? (
        <>
          {partner ? (
            <>
              {/* <GameSection
                smallTitle={`${partner}`}
                largeTitle={`${
                  educational ? 'Educational' : ''
                } Games by ${partner}`}
                titleChildren={
                  <div className="flex items-center gap-4">
                    {/* <IconButton
                      onClick={() => {
                        setEducational(!educational)
                      }}
                    >
                      {educational ? (
                        <IoSchool
                          className="w-full"
                          size={'35px'}
                          color="#00A98F"
                        />
                      ) : (
                        <IoSchoolOutline
                          className="w-full"
                          size={'35px'}
                          color="#00A98F"
                        />
                      )}
                    </IconButton> 
                    <Dropdown options={studios?.map((x) => x.name)} />
                  </div>
                }
                games={games.sort(
                  (a, b) =>
                    (b.sort ? b.sort : b.id * 100) -
                    (a.sort ? a.sort : a.id * 100)
                )}
              /> */}
            </>
          ) : null}
          <br />
          <br />
          <br />
          {/* <GameSection
            smallTitle={educational ? 'Educational Games' : 'Online Games'}
            largeTitle={
              educational ? 'Educational Online Games' : 'Play Games Online'
            }
            titleChildren={
              partner ? null : (
                <>
                  <div className="flex items-center gap-4">
                    {/* <IconButton
                      onClick={() => {
                        setEducational(!educational)
                      }}
                    >
                      {educational ? (
                        <IoSchool
                          className="w-full"
                          size={'35px'}
                          color="#00A98F"
                        />
                      ) : (
                        <IoSchoolOutline
                          className="w-full"
                          size={'35px'}
                          color="#00A98F"
                        />
                      )}
                    </IconButton> 
                    <Dropdown options={studios.map((x) => x.name)} />
                  </div>
                </>
              )
            }
            games={games
              .filter((x) =>
                x.playableOnHeihei == undefined ? true : x.playableOnHeihei
              )
              .sort(
                (a, b) =>
                  (b.sort ? b.sort : b.id * 100) -
                  (a.sort ? a.sort : a.id * 100)
              )}
          /> */}
          <br />
          <br />
          <br />
          {games.filter((x) => x.isApp).length === 0 ? null : (
            <GameSection
              smallTitle={educational ? 'Educational Apps' : 'Apps'}
              largeTitle={educational ? 'Educational Apps' : 'Download an App'}
              games={games
                .filter((x) => x.isApp)
                .sort(
                  (a, b) =>
                    (b.sort ? b.sort : b.id * 100) -
                    (a.sort ? a.sort : a.id * 100)
                )}
            />
          )}
        </>
      ) : error ? (
        <p className=" text-maingreen text-3xl">Failed to fetch games :(</p>
      ) : (
        <p className="text-maingreen text-3xl">Fetching Games...</p>
      )}
    </>
  )
}
