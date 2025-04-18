'use client'

import { useAuthState, useSignOut } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import type { User } from 'firebase/auth'

import '../../utils/client/firebase'
import { useRouter } from 'next/navigation'
import NoAuth from './noauth'
import { useEffect, useState } from 'react'
import Button from '../(components)/button'
import TryAgain from './try-again'
import { getPrivilege } from '@/api/admins'
import GameBackground from '../(components)/game-background'
import { Lato } from 'next/font/google'

const lato = Lato({ weight: '300', subsets: ['latin'] })

export default function Layout({ children }: { children: React.ReactNode }) {
  const [user, userLoading, userError] = useAuthState(getAuth())
  const [signOut, loading, signOutError] = useSignOut(getAuth())
  const [panel, setPanel] = useState<'admin' | 'noauth' | 'error' | ''>('')

  const router = useRouter()

  useEffect(() => {
    if (signOutError) {
      console.error(signOutError)
      alert(`An error occured while signing out. ${signOutError?.message}`)
    }
  }, [signOutError])

  useEffect(() => {
    if (userError) {
      console.error(userError)
      alert(`An error occured while fetching user. ${userError?.message}`)
    }
  }, [userError?.message, userError])

  useEffect(() => {
    if (user) {
      if (user.emailVerified) {
        fetchDashboardData(user)
      } else {
        router.push('/register')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  async function fetchDashboardData(u: User) {
    let res
    res = await getPrivilege(u)

    switch (res.status) {
      case 200:
        setPanel('admin')
        break
      case 401:
        setPanel('noauth')
        break
      case 500:
        setPanel('error')
      default:
        alert('An unknown error occured')
        console.error(res.status, res.text, res.body)
        return
    }
  }

  return (
    <GameBackground
      navBarChildren={
        <button
          onClick={signOut}
          className={`${lato.className} active:scale-90 hover:scale-110 hover:text-mainred duration-200`}
        >
          Sign Out
        </button>
      }
    >
      {user ? (
        <>
          {panel === 'admin' ? (
            <>{children}</>
          ) : (
            <div className="flex justify-center items-center w-full text-center">
              {panel === 'noauth' ? (
                <NoAuth />
              ) : panel === 'error' ? (
                <TryAgain onButtonClick={() => fetchDashboardData(user)} />
              ) : (
                <p className="text-xl font-bold text-center">Loading...</p>
              )}
            </div>
          )}
        </>
      ) : (
        <>
          <div className="flex justify-center items-center w-full text-center flex-col">
            <p className="text-2xl max-w-[800px] mx-auto font-semibold">
              You must be logged in to access the dashboard
            </p>
            <br />
            <Button
              onClick={() => {
                router.push('/login')
              }}
            >
              Go to Sign In
            </Button>
          </div>
        </>
      )}
    </GameBackground>
  )
}
