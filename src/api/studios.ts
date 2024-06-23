import request from 'superagent'
import { Studio } from '../../types'

export async function getAllStudios() {
  const res = await request.get('/api/studios')

  return res
}

export async function addStudio(studio: Studio) {
  const res = await request.post('/api/studios').send(studio)

  return res
}

export async function editStudio(studio: Studio) {
  const res = await request.patch('/api/studios').send(studio)

  return res
}

export async function deleteStudioByID(id: number) {
  const res = await request.delete(`/api/studios`).send({ id })
}
