import superagent from 'superagent'
import { Game } from '../../types'

export async function getGameByID(id: number) {
  const res = await superagent.get(`/api/game/${id}`)

  return res
}

export async function addGame(game: Game) {
  const res = await superagent.post('/api/game').send(game)

  return res
}

export async function editGameByID(id: number, game: Game) {
  const res = await superagent.patch(`/api/game/${id}`).send(game)
}

export async function deleteGameByID(id: number) {
  const res = await superagent.delete(`/api/game/${id}`)

  return res
}
