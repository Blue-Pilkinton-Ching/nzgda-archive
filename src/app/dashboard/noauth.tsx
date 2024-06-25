'use client'

import { requestPrivilege } from '@/api/requests'
import Button from '../(components)/button'
import '@/utils/client/firebase'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { User } from '../../../types'

export default function NoAuth() {
  const [user] = useAuthState(getAuth())

  async function requestAuthorisation(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.currentTarget.disabled = true

    try {
      if (user == null || !user.emailVerified || !user.email) {
        throw new Error('User not verified or not logged in!')
      }

      let u: User = {
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

    alert('Authorisation request sent!')
  }

  return (
    <>
      <Button onClick={requestAuthorisation}>Request Authorisation</Button>
      <br />
      <br />
    </>
  )
}
