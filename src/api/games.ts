import request from 'superagent'

export function getAllPublicGames() {
  return request.get('/api/games').ok((res) => true)
}
