'use client'

import { Admin, Game, Studio, UserTypes } from '../../../../../types'
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
      Promise.all([fetchGame(), fetchPartners(), fetchUsers()])
      setMessage('')
    }

    async function fetchPartners() {
      let data
      try {
        data = (await getAllStudios()).body
        if (!data) {
          setMessage("Couldn't retrieve studios :(")
          throw `Couldn't retrieve studios :(`
        }
        setStudios(data)
      } catch (error) {
        console.error(error)
        setMessage('Failed to game data :(')
      }
    }

    async function fetchUsers() {
      let data
      try {
        data = (await getAllAdmins(user as User)).body
        if (!data) {
          setMessage("Couldn't find data :(")
          throw 'User data not on firebase for some reason'
        }

        setAdmins(data)
      } catch (error) {
        console.error(error)
        setMessage('Failed to fetch users :(')
      }
    }

    async function fetchGame() {
      let data

      try {
        data = (await getGameByID(Number(params.id))).body as Game
      } catch (error) {
        console.error(error)
        setMessage('Failed to fetch game data :(')
      }
      setGame(data)
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
