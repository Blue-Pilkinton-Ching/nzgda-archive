import { User } from 'firebase/auth'
import request from 'superagent'

const apiOrigin = process.env.API_ORIGIN

export async function getAllAdmins(user: User) {
  return request
    .get(`${apiOrigin}/admins`)
    .ok((res) => true)
    .set('Authorization', `Bearer ${await user.getIdToken(true)}`)
}

export async function revokeAdmin(adminUID: string, user: User) {
  return request
    .delete(`${apiOrigin}/admins`)
    .ok((res) => true)
    .send({ uid: adminUID })
    .set('Authorization', `Bearer ${await user.getIdToken(true)}`)
}

export async function getPrivilege(user: User) {
  return request
    .get(`${apiOrigin}/admins/${user.uid}`)
    .ok((res) => true)
    .set('Authorization', `Bearer ${await user.getIdToken(true)}`)
}
