import request from 'superagent'
import { Admin } from '../../types'
import { User } from 'firebase/auth'

export async function requestPrivilege(admin: Admin, user: User) {
  return request
    .post(`/api/requests`)
    .send(admin)
    .ok((res) => true)
    .set('Authorization', `Bearer ${await user.getIdToken(true)}`)
}

export async function allowPrivilegeRequest(admin: Admin, user: User) {
  return request
    .patch(`/api/requests`)
    .send(admin)
    .ok((res) => true)
    .set('Authorization', `Bearer ${await user.getIdToken(true)}`)
}

export async function denyPrivilegeRequest(uid: string, user: User) {
  console.log(uid)

  return request
    .delete(`/api/requests`)
    .send({ uid })
    .ok((res) => true)
    .set('Authorization', `Bearer ${await user.getIdToken(true)}`)
}
