import request from 'superagent'
import type { User } from 'firebase/auth'

export async function getGameByID(id: number) {
  return request.get(`/api/game/${id}`).ok((res) => true)
}

export async function addGame(form: FormData, user: User) {
  const req = request
    .post('/api/game')
    .field('data', form.get('data') as any as string)
    .accept('application/json')
    .ok((res) => true)
    .set('Authorization', `Bearer ${await user.getIdToken(true)}`)

  if (form.get('thumbnail')) {
    req.attach('thumbnail', form.get('thumbnail') as any)
  }

  if (form.get('banner')) {
    req.attach('banner', form.get('banner') as any)
  }

  return req
}

export async function editGameByID(form: FormData, user: User, id: number) {
  const data = await JSON.parse(form.get('data') as any as string)

  const req = request
    .patch(`/api/game/${id}`)
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

export async function deleteGameByID(id: number, user: User) {
  return request
    .delete(`/api/game/${id}`)
    .ok((res) => true)
    .set('Authorization', `Bearer ${await user.getIdToken(true)}`)
}
