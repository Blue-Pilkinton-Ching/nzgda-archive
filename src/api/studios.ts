import request from 'superagent'
import { Studio } from '../../types'
import { User } from 'firebase/auth'

export async function getAllStudios() {
  return request.get('/api/studios').ok((res) => true)
}

export async function getStudioByID(id: number) {
  return request.get(`/api/studios/${id}`).ok((res) => true)
}

export async function editStudio(studio: Studio, user: User) {
  return request
    .patch('/api/studios')
    .send(studio)
    .set('Authorization', `Bearer ${await user.getIdToken(true)}`)
    .ok((res) => true)
}
export async function addStudio(studio: string, user: User) {
  const res = request
    .post('/api/studios')
    .send({ name: studio })
    .set('Authorization', `Bearer ${await user.getIdToken(true)}`)
    .ok((res) => true)

  return res
}

export async function deleteStudioByID(id: number, user: User) {
  return request
    .delete(`/api/studios`)
    .send({ id })
    .set('Authorization', `Bearer ${await user.getIdToken(true)}`)
    .ok((res) => true)
}
