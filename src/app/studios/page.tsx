'use client'

import { getAllStudios } from '@/api/studios'
import H1 from '../about/H1'
import { Studio } from '../../../types'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Main from '../(components)/main'

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
      <Main
        studio
        hideFeaturedContent
        description={
          <>
            The NZGDA games directory is the official archive of New Zealand
            made video games. <br />
            <br />
            Discover our games and the kiwi companies that made them.
          </>
        }
      >
        {loading ? (
          <div className="text-2xl font-bold">Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : studios.length > 0 ? (
          <>
            <div className="flex gap-3 flex-col mt-14">
              <p className="text-3xl font-semibold text-mainred">
                New Zealand Game Studios
              </p>
              <p className="mb-3">
                A list of some of the different Studios with Games you can find
                on this site!
              </p>

              <div className="w-full">
                <table className="w-full">
                  <thead>
                    <tr className="text-md *:text-start">
                      <th>Name</th>
                      <th>Location</th>
                      <th>Year Founded</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-4 divide-white">
                    {studios.sort().map((studio: Studio) => (
                      <tr key={studio.id} className="text-xl">
                        <td>
                          <Link href={`/studio/${studio.id}`}>
                            {studio.name}
                          </Link>
                        </td>
                        <td>{studio.cityOrRegion}</td>
                        <td>{studio.yearFounded}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div>Couldn&apos;t find any studios</div>
        )}
      </Main>
    </>
  )
}
