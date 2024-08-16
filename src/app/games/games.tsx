'use client'

import { Studio, Game } from '../../../types'
import React, { useEffect, useState } from 'react'

import '@/utils/client/firebase'
import Dropdown from '../(components)/dropdown'
import GameSection from './gamesection'
import { IconButton } from '../(components)/iconButton'
import { IoSchool, IoSchoolOutline } from 'react-icons/io5'
import { getAllGames } from '@/api/games'
import { getAllStudios } from '@/api/studios'
import { useSearchParams } from 'next/navigation'

export default function Games() {
  const [error, setError] = useState('')

  const [allGames, setAllGames] = useState<Game[]>([])
  const [games, setGames] = useState<Game[]>()
  const [studios, setStudios] = useState<Studio[]>([])
  const [studio, setStudio] = useState<string | null>()
  const [platform, setPlatform] = useState<string>('All')
  const params = useSearchParams()

  const [year, setYear] = useState(0)

  const [educational, setEducational] = useState(false)

  useEffect(() => {
    fetchGames()
    fetchStudios()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchGames() {
    try {
      let res = await getAllGames()
      if (res.ok) {
        setAllGames(res.body)
      } else {
        throw new Error(res.text)
      }
    } catch (error) {
      console.error(error)
      setError('Failed to fetch games :(')
    }
  }

  useEffect(() => {
    setGames(
      allGames.filter(
        (x) =>
          (params.get('admin') === 'true' || x.approved) &&
          ((platform === 'IOS' && x.iosLink) ||
            (platform === 'Android' && x.androidLink) ||
            (platform === 'Steam' && x.steamLink) ||
            platform === 'All') &&
          (year === 0 || Number(x.yearOfRelease) === year)
      )
    )
  }, [allGames, params, platform, studio, year])

  async function fetchStudios() {
    try {
      let res = await getAllStudios()
      if (res.ok) {
        setStudios(res.body)
      } else {
        throw new Error(res.text)
      }
    } catch (error) {
      console.error(error)
      setError('Failed to fetch game studios :(')
    }
  }

  return (
    <>
      {games && studios ? (
        <>
          <GameSection
            smallTitle={`Browse Games`}
            largeTitle={`Browse Games`}
            titleChildren={
              <div className="flex items-center md:gap-4 gap-x-2 flex-wrap justify-center">
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
                <Dropdown
                  onClick={(option) => {
                    setYear(option === 'All' ? 0 : Number(option))
                  }}
                  text={year === 0 ? 'Year' : year.toString()}
                  inverted
                  width={100}
                  maxHeight={200}
                  options={Array.from(
                    { length: new Date().getFullYear() - 1980 + 1 },
                    (_, i) => (1980 + i).toString()
                  ).reverse()}
                />{' '}
                <Dropdown
                  onClick={(option) => {
                    setPlatform(option)
                  }}
                  width={124}
                  text={platform === 'All' ? 'Platform' : platform}
                  inverted
                  options={['Steam', 'IOS', 'Android']}
                />
                <Dropdown
                  maxHeight={200}
                  width={155}
                  onClick={(option) => {
                    setStudio(option === 'All' ? null : option)
                  }}
                  text={studio ? studio : 'Studio'}
                  options={studios?.map((x) => x.name)}
                />
              </div>
            }
            games={
              studio
                ? games.filter(
                    (x) =>
                      x.studio_id === studios.find((s) => s.name === studio)?.id
                  )
                : games.sort(
                    (a, b) =>
                      (b.sort ? b.sort : b.id * 100) -
                      (a.sort ? a.sort : a.id * 100)
                  )
            }
          />
        </>
      ) : error ? (
        <p className=" text-3xl font-bold block text-mainred">
          Failed to fetch games :(
        </p>
      ) : (
        <p className="text-3xl font-bold block text-mainred">
          Fetching Games...
        </p>
      )}
    </>
  )
}
