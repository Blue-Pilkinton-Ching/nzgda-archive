'use client'

import Main from '@/app/(components)/main'
import { useEffect, useState } from 'react'
import { Game, Link, Studio } from '../../../../../types'
import { getStudioByID } from '@/api/studios'
import { getAllGames } from '@/api/games'
import { useParams } from 'next/navigation'
import GameSection from '@/app/directory/games/gamesection'
import PageLink from '@/app/(components)/page-link'
import { TfiWorld } from 'react-icons/tfi'
import { FaSteam } from 'react-icons/fa6'
import { FaAppStoreIos, FaGooglePlay } from 'react-icons/fa'

export default function Page() {
  const [data, setData] = useState<{ games: Game[]; studio: Studio }>({
    games: [],
    studio: {} as Studio,
  })
  const [links, setLinks] = useState<Link[]>([])
  const [error, setError] = useState('')

  const params = useParams<{ id: string }>()

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function getData() {
    const [gamesRes, studioRes] = await Promise.allSettled([
      getAllGames(),
      getStudioByID(Number(params.id)),
    ])

    if (gamesRes.status === 'fulfilled' && studioRes.status === 'fulfilled') {
      const l = await JSON.parse(studioRes.value.body.otherLinks)

      setLinks(l as Link[])
      setData({
        games: gamesRes.value.body,
        studio: studioRes.value.body,
      })
    } else {
      setError('Failed to fetch games :(')
    }
  }

  return (
    <>
      {error ? (
        <div>{error}</div>
      ) : (
        <Main
          SideContent={
            <>
              <div className="flex-1">
                <div className="min-w-[240px] w-full h-[50%] items-center flex drop-shadow mb-8">
                  {data.studio?.description ? (
                    <div className="flex justify-evenly mb-5 items-center min-h-[350px]">
                      <div className="flex flex-col gap-5">
                        <h1 className="text-7xl font-semibold text-mainred">
                          {data.studio.name}
                        </h1>
                        <p className="text-justify">
                          {data.studio?.description || ''}
                        </p>
                        <div>
                          <p className="text-lg">
                            Year Founded:{' '}
                            <strong className="font-medium">
                              {data.studio.yearFounded}
                            </strong>
                          </p>
                          <p className="text-lg">
                            Location:{' '}
                            <strong className="font-medium">
                              {data.studio.cityOrRegion}
                            </strong>
                          </p>
                        </div>
                        <div className="flex gap-3 items-center justify-start flex-row flex-wrap">
                          {data.studio.ios && (
                            <PageLink
                              href={data.studio.ios || ''}
                              text="Play Store"
                            >
                              <FaGooglePlay size={24} />
                            </PageLink>
                          )}
                          {data.studio.android && (
                            <PageLink
                              href={data.studio.android || ''}
                              text="App Store"
                            >
                              <FaAppStoreIos size={24} />
                            </PageLink>
                          )}
                          {data.studio.website && (
                            <PageLink
                              href={data.studio.website || ''}
                              text="Website"
                            >
                              <TfiWorld size={24} />
                            </PageLink>
                          )}
                          {data.studio.steam && (
                            <PageLink
                              href={data.studio.steam || ''}
                              text="Steam"
                            >
                              <FaSteam size={24} />
                            </PageLink>
                          )}
                          {links &&
                            links.map((link) => {
                              return (
                                <PageLink
                                  key={link.label}
                                  href={link.url}
                                  text={link.label}
                                ></PageLink>
                              )
                            })}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </>
          }
        >
          <div>
            <GameSection
              games={data.games.filter(
                (element) =>
                  !element.hidden && element.studio_id === Number(params.id)
              )}
              smallTitle={'Games'}
              largeTitle={
                data.studio?.name ? `Games by ${data.studio?.name}` : ''
              }
            />
          </div>
        </Main>
      )}
    </>
  )
}
