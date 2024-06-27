'use client'

import { Studio } from '../../../../types'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'

import GameForm from '../gameform'
import { getAllStudios } from '@/api/studios'

export default function Page() {
  const [user] = useAuthState(getAuth())

  const [studios, setStudios] = useState<Studio[]>([])
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  const [message, setMessage] = useState('')

  useEffect(() => {
    if (user == null) {
      window.location.href = '/dashboard'
      return
    } else {
      getStudio()
    }

    async function getStudio() {
      let res

      try {
        res = await getAllStudios()

        setIsAdmin(res.headers['studio'] === '0')
        setStudios(res.body)
      } catch (error) {
        console.error(error)
        setMessage('Failed to fetch users :(')
      }
    }
  }, [user])

  return (
    <>
      {message ? (
        <p>{message}</p>
      ) : (
        <GameForm edit={false} studios={studios} admin={isAdmin} />
      )}
    </>
  )
}
