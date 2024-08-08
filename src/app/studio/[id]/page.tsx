'use client'

import Main from '@/app/(components)/main'
import { useEffect, useState } from 'react'
import { Game, Studio } from '../../../../types'
import { getStudioByID } from '@/api/studios'
import { getAllGames } from '@/api/games'
import { useParams, useSearchParams } from 'next/navigation'
import GameSection from '@/app/games/gamesection'
import PageLink from '@/app/(components)/page-link'
import { TfiWorld } from 'react-icons/tfi'
import { FaSteam } from 'react-icons/fa6'
import { FaAppStoreIos, FaGooglePlay } from 'react-icons/fa'

export default function Page() {
  const [data, setData] = useState<{ games: Game[]; studio: Studio }>({
    games: [],
    studio: {} as Studio,
  })
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
          studio
          title={data.studio?.name || ''}
          hideFeaturedContent
          description={
            data.studio?.description ? (
              <div className="flex flex-col gap-5">
                {data.studio?.description || ''}
                <div className="flex gap-3 items-center justify-center flex-row flex-wrap">
                  <PageLink href={data.studio.website || ''} text="Website">
                    <TfiWorld size={24} />
                  </PageLink>
                  <PageLink href={data.studio.steam || ''} text="Steam">
                    <FaSteam size={24} />
                  </PageLink>
                  <PageLink href={data.studio.ios || ''} text="Play Store">
                    <FaGooglePlay size={24} />
                  </PageLink>
                  <PageLink href={data.studio.android || ''} text="App Store">
                    <FaAppStoreIos size={24} />
                  </PageLink>
                </div>
              </div>
            ) : null
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
