'use client'

import { Studio } from '../../../../../types'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth, User } from 'firebase/auth'

import GameForm from '../studioform'
import { getAllStudios } from '@/api/studios'
import { getPrivilege } from '@/api/admins'
import StudioForm from '../studioform'

export default function Page() {
  const [user] = useAuthState(getAuth())

  const [message, setMessage] = useState('')

  useEffect(() => {
    if (user == null) {
      window.location.href = '/dashboard'
      return
    }
  }, [user])

  return (
    <>
      {message ? (
        <p>{message}</p>
      ) : (
        <StudioForm edit={false} studio={undefined} />
      )}
    </>
  )
}
