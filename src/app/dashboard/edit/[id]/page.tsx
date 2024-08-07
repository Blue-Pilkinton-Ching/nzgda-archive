'use client'

import { Admin, Game, Studio } from '../../../../../types'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth, User } from 'firebase/auth'

import '@/utils/client/firebase'

import { useParams } from 'next/navigation'
import GameForm from '../../gameform'
import { getGameByID } from '@/api/game'
import { getAllStudios } from '@/api/studios'
import { getAllAdmins } from '@/api/admins'

export default function EditGame() {
  const [user] = useAuthState(getAuth())
  const [message, setMessage] = useState('Loading Game...')
  const [game, setGame] = useState<Game>()
  const [studios, setStudios] = useState<Studio[]>([])
  const [admins, setAdmins] = useState<Admin[]>()
  const params = useParams<{ id: string }>()

  useEffect(() => {
    if (user == null) {
      window.location.href = '/dashboard'
      return
    } else {
      getData()
    }

    async function getData() {
      try {
        const [gameRes, partnersRes, usersRes] = await Promise.allSettled([
          fetchGame(),
          fetchPartners(),
          fetchUsers(),
        ])

        if (
          gameRes.status === 'fulfilled' &&
          partnersRes.status === 'fulfilled' &&
          usersRes.status === 'fulfilled'
        ) {
          setGame(gameRes.value)
          setStudios(partnersRes.value)
          setAdmins(usersRes.value)
          setMessage('')
        } else {
          setMessage('Failed to fetch game data :(')
        }
      } catch (error) {
        console.error(error)
        setMessage('Failed to fetch game data :(')
      }
    }

    async function fetchPartners() {
      return (await getAllStudios()).body
    }

    async function fetchUsers() {
      return (await getAllAdmins(user as User)).body
    }

    async function fetchGame() {
      return (await getGameByID(Number(params.id))).body as Game
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <>
      {message ? (
        <p>{message}</p>
      ) : (
        <GameForm
          edit
          game={game}
          studios={studios}
          id={Number(params.id)}
          admin={admins?.find((u) => u.uid === user?.uid)?.studio === 0}
        />
      )}
    </>
  )
}
