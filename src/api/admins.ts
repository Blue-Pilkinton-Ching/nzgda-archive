import superagent from 'superagent'

export async function getAllAdmins() {
  const res = await superagent.get('/api/admins')

  return res
}

export async function revokeAdmin() {
  const res = await superagent.delete('/api/admins')

  return res
}
