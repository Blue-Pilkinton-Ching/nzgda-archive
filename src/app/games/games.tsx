'use client'

import { Studio, Game } from '../../../types'
import React, { useEffect, useState } from 'react'

import '@/utils/client/firebase'
import Dropdown from '../(components)/dropdown'
import { useSearchParams } from 'next/navigation'
import GameSection from './gamesection'
import { IconButton } from '../(components)/iconButton'
import { IoSchool, IoSchoolOutline } from 'react-icons/io5'
import { getAllGames } from '@/api/games'

export default function Games() {
  const [error, setError] = useState('')

  const [games, setGames] = useState<Game[]>()
  const [studios, setStudios] = useState<Studio[]>([])
  const [studio, setStudio] = useState<string | null>()

  const [educational, setEducational] = useState(false)

  const params = useSearchParams()

  useEffect(() => {
    fetchGames()
    setStudio(params.get('partner'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  async function fetchGames() {
    try {
      let res = await getAllGames()
      if (res.ok) {
        if (params.get('admin') === 'true') {
          setGames(res.body)
        } else {
          setGames((res.body as Game[]).filter((x) => x.approved))
        }
      } else {
        throw new Error(res.text)
      }
    } catch (error) {
      console.error(error)
      setError('Failed to fetch games :(')
    }
  }

  return (
    <>
      {games ? (
        <>
          {studio ? (
            <>
              <GameSection
                smallTitle={`${studio}`}
                largeTitle={`${
                  educational ? 'Educational' : ''
                } Games by ${studio}`}
                titleChildren={
                  <div className="flex items-center gap-4">
                    <IconButton
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
              />
            </>
          ) : null}
          <br />
          <br />
          <br />
          <GameSection
            smallTitle={educational ? 'Educational Games' : 'Online Games'}
            largeTitle={
              educational ? 'Educational Online Games' : 'Play Games Online'
            }
            titleChildren={
              studio ? null : (
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
                    </IconButton> */}
                    <Dropdown options={studios.map((x) => x.name)} />
                  </div>
                </>
              )
            }
            games={games.sort(
              (a, b) =>
                (b.sort ? b.sort : b.id * 100) - (a.sort ? a.sort : a.id * 100)
            )}
          />
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
