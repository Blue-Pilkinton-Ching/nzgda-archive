'use client'

import { getAllStudios } from '@/api/studios'
import About from '../about/about'
import H1 from '../about/H1'
import { Studio } from '../../../types'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Page() {
  const [studios, setStudios] = useState<Studio[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getStudios()
  }, [])

  async function getStudios() {
    const studios = await getAllStudios()

    if (studios.error) {
      setError('Whoops! Soemthing went wrong')
    }

    setLoading(false)
    setStudios((await studios.body) as Studio[])
  }

  return (
    <>
      <About>
        {loading ? (
          <div className="text-2xl font-bold">Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : studios.length > 0 ? (
          <>
            <H1>New Zealand Game Studios</H1>
            <p className="max-w-[440px] mx-auto mb-10">
              A list of some of the different Studios with Games you can find on
              this site!
            </p>
            {studios.sort().map((studio: Studio) => (
              <>
                <Link
                  className="block text-2xl mb-2 hover:scale-110 duration-200 active:scale-90"
                  key={studio.id}
                  href={`/studios/${studio.id}`}
                >
                  {studio.name}
                </Link>
              </>
            ))}
          </>
        ) : (
          <div>Couldn&apos;t find any studios</div>
        )}
      </About>
    </>
  )
}
