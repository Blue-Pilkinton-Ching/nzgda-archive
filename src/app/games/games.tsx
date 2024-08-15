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
  const [platform, setPlatform] = useState<string>('None')
  const params = useSearchParams()

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
            !platform)
      )
    )
  }, [allGames, params, platform, studio])

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
            smallTitle={studio ? studio : 'All Games'}
            largeTitle={
              studio
                ? `${
                    platform !== 'None' ? `${platform} ` : ''
                  }Games by ${studio}`
                : `${platform !== 'None' ? `${platform} ` : 'All'} Games`
            }
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
                    </IconButton> */}
                <Dropdown
                  onClick={(option) => {
                    setPlatform(option)
                  }}
                  text="Select Platform"
                  query="platform"
                  inverted
                  options={['Steam', 'IOS', 'Android']}
                />
                <Dropdown
                  onClick={(option) => {
                    setStudio(option === 'None' ? null : option)
                  }}
                  query="studio"
                  text="Select Studio"
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
