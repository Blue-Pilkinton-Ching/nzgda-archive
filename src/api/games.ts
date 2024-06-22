import superagent from 'superagent'

export async function getAllGames() {
  const res = await superagent.get('/api/games')

  return res
}
