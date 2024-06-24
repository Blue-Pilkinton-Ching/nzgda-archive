import request from 'superagent'
import { Game } from '../../types'

export async function getGameByID(id: number) {
  return request.get(`/api/game/${id}`).ok((res) => true)
}

export async function addGame(game: Game) {
  const res = await request
    .post('/api/game')
    .send(game)
    .ok((res) => true)

  return res
}

export async function editGameByID(game: Game) {
  const res = await request
    .patch(`/api/game`)
    .send(game)
    .ok((res) => true)

  return res
}

export async function deleteGameByID(id: number) {
  const res = await request
    .delete(`/api/game`)
    .send({ id })
    .ok((res) => true)

  return res
}
