import request from 'superagent'

export function getAllGames() {
  return request.get('/api/games').ok((res) => true)
}
