import request from 'superagent'
import { User } from '../../types'
import { User as FirebaseUser } from 'firebase/auth'

export async function requestPrivilege(user: User, firebaseUser: FirebaseUser) {
  return request
    .post(`/api/requests`)
    .send(user)
    .ok((res) => true)
    .set('Authorization', `Bearer ${await firebaseUser.getIdToken(true)}`)
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
