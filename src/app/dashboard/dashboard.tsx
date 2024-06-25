'use client'
import { useEffect, useState } from 'react'
import { DashboardData, Admin } from '../../../types'
import Button from '../(components)/button'
import Users from './users'
import GamesList from './gameslist'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'

import '@/utils/client/firebase'
import Studios from './studios'

export default function Dashboard({
  data,
  invalidateData,
  adminUser,
}: {
  adminUser: boolean
  data: DashboardData
  invalidateData: () => void
}) {
  const [dashboardData, setDashboardData] = useState<DashboardData>()
  const [panel, setPanel] = useState<'users' | 'games' | 'studios'>('games')

  const [user] = useAuthState(getAuth())

  useEffect(() => {
    setDashboardData(data)
  }, [data])

  if (!dashboardData) {
    return (
      <div className="text-xl text-mainred font-semibold">
        Loading dashboard...
      </div>
    )
  }

  return (
    <>
      <div className="max-w-[800px] text-wrap mx-auto text-left mt-20 text-lg mb-12 font-sans text-black">
        {adminUser ? (
          <div className="flex justify-center gap-10">
            <Button
              onClick={() => setPanel('games')}
              inverted={panel !== 'games'}
              className="bg-black text-white"
              invertedClassName="bg-white text-black"
            >
              Games
            </Button>
            <Button
              onClick={() => setPanel('users')}
              inverted={panel !== 'users'}
              className="bg-black text-white"
              invertedClassName="bg-white text-black"
            >
              Users & Settings
            </Button>
            <Button
              onClick={() => setPanel('studios')}
              inverted={panel !== 'studios'}
              className="bg-black text-white"
              invertedClassName="bg-white text-black"
            >
              Partners
            </Button>
          </div>
        ) : null}
        <br />
        <GamesList
          invalidateGames={invalidateData}
          className={`${
            panel === 'games' ? 'block' : 'hidden'
          } shadow-lg p-4 rounded`}
          admin={adminUser}
          games={dashboardData.games
            .filter(
              (x) =>
                (x.hidden === false || x.hidden === undefined) &&
                x.approved === true &&
                (adminUser
                  ? true
                  : x.studio.id ===
                    data.admins.find((u) => u.uid === user?.uid)?.studio)
            )
            .sort((a, b) => b.id - a.id)}
          hiddenGames={dashboardData.games.filter((x) => x.hidden)}
          unApprovedGames={
            adminUser
              ? dashboardData.games.filter(
                  (x) => x.approved === false || x.approved === undefined
                )
              : undefined
          }
        ></GamesList>
        {adminUser ? (
          <>
            <Users
              invalidateUsers={invalidateData}
              studios={dashboardData.studios}
              users={dashboardData.admins}
              className={`${
                panel === 'users' ? 'block' : 'hidden'
              } shadow-lg p-4 rounded`}
              requests={dashboardData.requests}
            ></Users>
            <Studios
              invalidateStudios={invalidateData}
              studios={dashboardData.studios}
              className={`${
                panel === 'studios' ? 'block' : 'hidden'
              } shadow-lg p-4 rounded`}
            ></Studios>
          </>
        ) : null}
      </div>
    </>
  )
}
