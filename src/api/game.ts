import request from 'superagent'
import type { User } from 'firebase/auth'

export async function getGameByID(id: number) {
  return request.get(`/api/game/${id}`).ok((res) => true)
}

export async function addGame(form: FormData, user: User) {
  const data = await JSON.parse(form.get('data') as any as string)

  const req = request
    .post('/api/game')
    .accept('application/json')
    .send(data)
    .ok((res) => true)
    .set('Authorization', `Bearer ${await user.getIdToken(true)}`)

  if (form.get('thumbnail')) {
    req.attach('thumbnail', !form.get('thumbnail'))
  }

  if (form.get('banner')) {
    req.attach('banner', !form.get('banner'))
  }

  return req
}

export async function editGame(form: FormData, user: User) {
  const data = await JSON.parse(form.get('data') as any as string)

  const req = request
    .patch('/api/game')
    .accept('application/json')
    .send(data)
    .ok((res) => true)
    .set('Authorization', `Bearer ${await user.getIdToken(true)}`)

  if (form.get('thumbnail')) {
    req.attach('thumbnail', !form.get('thumbnail'))
  }

  if (form.get('banner')) {
    req.attach('banner', !form.get('banner'))
  }

  return req
}

export async function deleteGameByID(id: number) {
  return request
    .delete(`/api/game`)
    .send({ id })
    .ok((res) => true)
}
