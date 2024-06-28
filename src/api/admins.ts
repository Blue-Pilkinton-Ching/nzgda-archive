import { User } from 'firebase/auth'
import request from 'superagent'

export async function getAllAdmins(user: User) {
  return request
    .get('/api/admins')
    .ok((res) => true)
    .set('Authorization', `Bearer ${await user.getIdToken(true)}`)
}

export async function revokeAdmin(adminUID: string, user: User) {
  return request
    .delete('/api/admins')
    .ok((res) => true)
    .send({ uid: adminUID })
    .set('Authorization', `Bearer ${await user.getIdToken(true)}`)
}

export async function getPrivilege(user: User) {
  return request
    .get(`/api/admins/${user.uid}`)
    .ok((res) => true)
    .set('Authorization', `Bearer ${await user.getIdToken(true)}`)
}
