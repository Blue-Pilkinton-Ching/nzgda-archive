'use client'

import { Studio } from '../../../../types'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth, User } from 'firebase/auth'

import GameForm from '../gameform'
import { getAllStudios } from '@/api/studios'
import { getPrivilege } from '@/api/admins'

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
      getData()
    }

    async function getData() {
      let res

      try {
        const [studiosRes, privilegeRes] = await Promise.allSettled([
          getAllStudios(),
          getPrivilege(user as User),
        ])

        if (studiosRes.status === 'fulfilled') {
          setStudios(studiosRes.value.body)
        } else {
          throw studiosRes.reason
        }

        if (privilegeRes.status === 'fulfilled') {
          setIsAdmin(privilegeRes.value.header.studio === '0')
        } else {
          throw privilegeRes.reason
        }
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
