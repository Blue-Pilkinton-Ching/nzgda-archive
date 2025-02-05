import request from 'superagent'
import { Admin } from '../../types'
import { User } from 'firebase/auth'

const apiOrigin = process.env.API_ORIGIN

export async function requestPrivilege(admin: Admin, user: User) {
  return request
    .post(`${apiOrigin}/requests`)
    .send(admin)
    .ok((res) => true)
    .set('Authorization', `Bearer ${await user.getIdToken(true)}`)
}
export async function getRequestPending(admin: Admin, user: User) {
  return request
    .get(`${apiOrigin}/requests/${admin.uid}`)
    .ok((res) => true)
    .set('Authorization', `Bearer ${await user.getIdToken(true)}`)
}

export async function allowPrivilegeRequest(admin: Admin, user: User) {
  return request
    .patch(`${apiOrigin}/requests`)
    .send(admin)
    .ok((res) => true)
    .set('Authorization', `Bearer ${await user.getIdToken(true)}`)
}

export async function denyPrivilegeRequest(uid: string, user: User) {
  console.log(uid)

  return request
    .delete(`${apiOrigin}/requests`)
    .send({ uid })
    .ok((res) => true)
    .set('Authorization', `Bearer ${await user.getIdToken(true)}`)
}
