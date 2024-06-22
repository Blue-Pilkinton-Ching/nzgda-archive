import superagent from 'superagent'

export async function getAllPublicGames() {
  const res = await superagent.get('/api/games/all/public')

  return res
}

export async function getAllArchivedGames() {
  const res = await superagent.get('/api/games/all/archived')

  return res
}

export async function getAllUnapprovedGames() {
  const res = await superagent.get(`/api/games/all/unapproved`)

  return res
}

export async function getFeaturedGame() {
  const res = await superagent.get('/api/games/all/featured')

  return res
}

export async function getAllPublicGamesByStudio(studio: number) {
  const res = await superagent.get(`/api/games/${studio}/public`)

  return res
}

export async function getAllArchivedGamesByStudio(studio: number) {
  const res = await superagent.get(`/api/games/${studio}/archived`)

  return res
}

export async function getAllUnapprovedGamesByStudio(studio: number) {
  const res = await superagent.get(`/api/games/${studio}/unapproved`)

  return res
}

export async function getFeaturedGameByStudio(studio: number) {
  const res = await superagent.get(`/api/games/${studio}/featured`)

  return res
}
