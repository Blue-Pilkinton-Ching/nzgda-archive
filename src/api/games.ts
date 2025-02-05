import request from 'superagent'

const apiOrigin = process.env.API_ORIGIN

export async function getAllGames() {
  return request.get(`${apiOrigin}/games`).ok((res) => true)
}
