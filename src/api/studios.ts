import request from 'superagent'
import { Studio } from '../../types'
import { User } from 'firebase/auth'

export async function getAllStudios() {
  return await request.get('/api/studios').ok((res) => true)
}

export async function editStudio(studio: Studio) {
  const res = await request.patch('/api/studios').send(studio)

  return res
}
export async function addStudio(studio: string, user: User) {
  const res = await request
    .post('/api/studios')
    .send({ name: studio })
    .set('Authorization', `Bearer ${await user.getIdToken(true)}`)
    .ok((res) => true)

  return res
}

export async function deleteStudioByID(id: number) {
  const res = await request.delete(`/api/studios`).send({ id })
}
