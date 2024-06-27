import request from 'superagent'
import { Studio } from '../../types'

export async function getAllStudios() {
  return await request.get('/api/studios').ok((res) => true)
}

export async function editStudio(studio: Studio) {
  const res = await request.patch('/api/studios').send(studio)

  return res
}

export async function deleteStudioByID(id: number) {
  const res = await request.delete(`/api/studios`).send({ id })
}
