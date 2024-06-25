'use client'

import { Game, Studio, Admin } from '../../../../types'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import type { User } from 'firebase/auth'

import GameForm from '../gameform'
import { getAllAdmins, getPrivilege } from '@/api/admins'

export default function Page() {
  const [user] = useAuthState(getAuth())

  const [admins, setAdmins] = useState<Studio[]>([])

  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  const [message, setMessage] = useState('')

  useEffect(() => {
    if (user == null) {
      window.location.href = '/dashboard'
      return
    } else {
      getStudio(user)
    }

    async function getStudio(u: User) {
      let data
      let res

      try {
        res = await getAllAdmins(u)

        setIsAdmin(res.headers['studio'] === '0')
        setAdmins(res.body)
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
        <GameForm edit={false} studios={admins} admin={isAdmin} />
      )}
    </>
  )
}
