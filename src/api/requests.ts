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

export async function getAllPrivilegeRequests() {
  return request.get(`/api/requests`).ok((res) => true)
}

export async function allowPrivilegeRequest(uid: string, studio: number) {
  return request
    .patch(`/api/requests`)
    .send({ uid, studio })
    .ok((res) => true)
}

export async function denyPrivilegeRequest(uid: string) {
  return request
    .post(`/api/requests`)
    .send({ uid })
    .ok((res) => true)
}
