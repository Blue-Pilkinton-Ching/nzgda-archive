'use client'

import { getRequestPending, requestPrivilege } from '@/api/requests'
import Button from '../(components)/button'
import '@/utils/client/firebase'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Admin } from '../../../types'
import { useEffect, useState } from 'react'

export default function NoAuth() {
  const [user] = useAuthState(getAuth())
  const [loading, setLoading] = useState(true)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    if (user) {
      getPendingRequestState()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  async function getPendingRequestState() {
    if (user == null || !user.emailVerified || !user.email) {
      throw new Error('User not verified or not logged in!')
    }

    let u: Admin = {
      uid: user.uid,
      email: user.email,
      studio: 0,
    }

    try {
      const res = await getRequestPending(u, user)
      const body = await res.body
      console.log(body)
      setPending(body.pending)
    } catch (error) {
      alert('Something went wrong. Please try again later.')
      console.error(error)
    }

    setLoading(false)
  }

  async function requestAuthorisation(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    setLoading(true)

    try {
      if (user == null || !user.emailVerified || !user.email) {
        throw new Error('User not verified or not logged in!')
      }

      let u: Admin = {
        uid: user.uid,
        email: user.email,
        studio: 0,
      }

      const res = await requestPrivilege(u, user)

      // If res not ok, then throw error

      switch (res.status) {
        case 200:
          break
        case 401:
          alert('You are Unauthorized to make that action')
          return
        case 500:
          alert('An error occured while sending authorisation request')
          return
        default:
          alert('An unknown error occured')
          console.error(res.status, res.text, res.body)
          return
      }
    } catch (error) {
      console.error(error)
      alert(error)
      return
    }

    getPendingRequestState()
  }

  return (
    <>
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          {pending ? (
            <p className="text-lg font-bold text-black max-w-96 ">
              You have an authorisation request pending. Please wait for an
              admin to accept it.
            </p>
          ) : (
            <Button onClick={requestAuthorisation}>
              Request Authorisation
            </Button>
          )}
        </>
      )}
    </>
  )
}
