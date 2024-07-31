'use client'

import Main from '@/app/(components)/main'
import { useEffect, useState } from 'react'
import { Game, Studio } from '../../../../types'
import { getStudioByID } from '@/api/studios'
import { getAllGames } from '@/api/games'
import { useSearchParams } from 'next/navigation'

export default function Page() {
  const [data, setData] = useState<{ games: Game[]; studio: Studio }>({
    games: [],
    studio: {} as Studio,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const params = useSearchParams()

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function getData() {
    const [gamesRes, studioRes] = await Promise.allSettled([
      getAllGames(),
      getStudioByID(Number(params.get('id'))),
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
      <Main title="PikPok" hideFeaturedContent description={'descrit'}>
        <h1>Children Games</h1>
      </Main>
    </>
  )
}
