import request from 'superagent'

export async function getAllAdmins() {
  const res = await request.get('/api/admins')

  return res
}

export async function revokeAdmin() {
  const res = await request.delete('/api/admins')

  return res
}
