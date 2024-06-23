import request from 'superagent'
import { Game } from '../../types'

export async function getGameByID(id: number) {
  const res = await request.get(`/api/game/${id}`)

  return res
}

export async function addGame(game: Game) {
  const res = await request.post('/api/game').send(game)

  return res
}

export async function editGameByID(game: Game) {
  const res = await request.patch(`/api/game`).send(game)

  return res
}

export async function deleteGameByID(id: number) {
  const res = await request.delete(`/api/game`).send({ id })

  return res
}
