import superagent from 'superagent'
import { Studio } from '../../types'

export async function getAllStudios() {
  const res = await superagent.get('/api/studios')

  return res
}

export async function addStudio(studio: Studio) {
  const res = await superagent.post('/api/studios').send(studio)

  return res
}

export async function editStudio(studio: Studio) {
  const res = await superagent.patch('/api/studios').send(studio)

  return res
}

export async function deleteStudioByID(id: number) {
  const res = await superagent.delete(`/api/studios`).send({ id })
}
