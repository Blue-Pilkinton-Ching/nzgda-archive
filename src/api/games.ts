import request from 'superagent'

export function getAllPublicGames() {
  return request.get('/api/games/all/public').ok((res) => true)
}

export async function getFeaturedGame() {
  return request.get('/api/games/all/featured').ok((res) => true)
}

export async function getAllPublicGamesByStudio(studio: number) {
  return request.get(`/api/games/${studio}/public`).ok((res) => true)
}
