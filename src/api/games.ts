import request from 'superagent'

export async function getAllPublicGames() {
  return request.get('/api/games/all/public')
}

export async function getAllArchivedGames() {
  return request.get('/api/games/all/archived')
}

export async function getAllUnapprovedGames() {
  return request.get(`/api/games/all/unapproved`)
}

export async function getFeaturedGame() {
  const res = await request.get('/api/games/all/featured')

  return res
}

export async function getAllPublicGamesByStudio(studio: number) {
  const res = await request.get(`/api/games/${studio}/public`)

  return res
}

export async function getAllArchivedGamesByStudio(studio: number) {
  const res = await request.get(`/api/games/${studio}/archived`)

  return res
}

export async function getAllUnapprovedGamesByStudio(studio: number) {
  const res = await request.get(`/api/games/${studio}/unapproved`)

  return res
}

export async function getFeaturedGameByStudio(studio: number) {
  const res = await request.get(`/api/games/${studio}/featured`)

  return res
}
