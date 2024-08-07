'use client'

import { Studio } from '../../../../../../types'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'

import { getStudioByID } from '@/api/studios'
import StudioForm from '../../studioform'
import { useParams } from 'next/navigation'

export default function Page() {
  const [user] = useAuthState(getAuth())
  const [studio, setStudio] = useState<Studio | undefined>(undefined)
  const params = useParams<{ id: string }>()
  const [message, setMessage] = useState('Loading...')

  useEffect(() => {
    if (user == null) {
      window.location.href = '/dashboard'
      return
    } else {
      getData()
    }

    async function getData() {
      try {
        const res = await getStudioByID(Number(params.id))
        console.log(res.body)
        setStudio(res.body)
        setMessage('')
      } catch (error) {
        console.error(error)
        setMessage('Failed to fetch users :(')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <>
      {message ? (
        <p className="font-semibold text-lg">{message}</p>
      ) : (
        <StudioForm edit={false} studio={studio} />
      )}
    </>
  )
}
