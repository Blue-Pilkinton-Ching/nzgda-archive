import { User } from 'firebase/auth'
import request from 'superagent'

export function getAllAdmins() {
  return request.get('/api/admins').ok((res) => true)
}

export function revokeAdmin() {
  return request.delete('/api/admins').ok((res) => true)
}

export async function getPrivilege(user: User) {
  return request
    .get(`/api/admins/${user.uid}`)
    .set('Authorization', `Bearer ${await user.getIdToken(true)}`).ok((res) => true)
}
