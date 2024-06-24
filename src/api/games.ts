import request from 'superagent'

export function getAllPublicGames() {
  return request.get('/api/games/all/public').ok((res) => true)
}

export async function getAllArchivedGames() {
  return request.get('/api/games/all/archived').ok((res) => true)
}

export async function getAllUnapprovedGames() {
  return request.get(`/api/games/all/unapproved`).ok((res) => true)
}

export async function getFeaturedGame() {
  const res = await request.get('/api/games/all/featured').ok((res) => true)

  return res
}

export async function getAllPublicGamesByStudio(studio: number) {
  const res = await request.get(`/api/games/${studio}/public`).ok((res) => true)

  return res
}

export async function getAllArchivedGamesByStudio(studio: number) {
  const res = await request
    .get(`/api/games/${studio}/archived`)
    .ok((res) => true)

  return res
}

export async function getAllUnapprovedGamesByStudio(studio: number) {
  const res = await request
    .get(`/api/games/${studio}/unapproved`)
    .ok((res) => true)

  return res
}

export async function getFeaturedGameByStudio(studio: number) {
  const res = await request
    .get(`/api/games/${studio}/featured`)
    .ok((res) => true)

  return res
}
