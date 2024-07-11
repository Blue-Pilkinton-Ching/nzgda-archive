import request from 'superagent'

export async function getAllGames() {
  return request.get('/api/games').ok((res) => true)
}
