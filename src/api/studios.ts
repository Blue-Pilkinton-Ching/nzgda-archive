import request from 'superagent'
import { Studio } from '../../types'
import { User } from 'firebase/auth'

const apiOrigin = process.env.API_ORIGIN

export async function getAllStudios() {
  return request.get(`${apiOrigin}/studios`).ok((res) => true)
}

export async function getStudioByID(id: number) {
  return request.get(`${apiOrigin}/studios/${id}`).ok((res) => true)
}

export async function editStudio(studio: Studio, user: User) {
  return request
    .patch(`${apiOrigin}/studios`)
    .send(studio)
    .set('Authorization', `Bearer ${await user.getIdToken(true)}`)
    .ok((res) => true)
}
export async function addStudio(studio: Studio, user: User) {
  const res = request
    .post(`${apiOrigin}/studios`)
    .send({ studio })
    .set('Authorization', `Bearer ${await user.getIdToken(true)}`)
    .ok((res) => true)

  return res
}

export async function deleteStudioByID(id: number, user: User) {
  return request
    .delete(`${apiOrigin}/studios`)
    .send({ id })
    .set('Authorization', `Bearer ${await user.getIdToken(true)}`)
    .ok((res) => true)
}
