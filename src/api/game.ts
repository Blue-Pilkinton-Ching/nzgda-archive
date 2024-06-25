import request from 'superagent'
import { Game } from '../../types'

export async function getGameByID(id: number) {
  return request.get(`/api/game/${id}`).ok((res) => true)
}

export async function addGame(game: Game) {
  return request
    .post('/api/game')
    .send(game)
    .ok((res) => true)
}

export async function deleteGameByID(id: number) {
  return request
    .delete(`/api/game`)
    .send({ id })
    .ok((res) => true)
}
