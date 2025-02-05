import request from 'superagent'
import type { User } from 'firebase/auth'

const apiOrigin = process.env.API_ORIGIN

export async function getGameByID(id: number) {
  return request.get(`${apiOrigin}/game/${id}`).ok((res) => true)
}

export async function addGame(form: FormData, user: User) {
  const req = request
    .post(`${apiOrigin}/game`)
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
  const req = request
    .patch(`${apiOrigin}/game/${id}`)
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

export async function deleteGameByID(id: number, user: User) {
  return request
    .delete(`${apiOrigin}/game/${id}`)
    .ok((res) => true)
    .set('Authorization', `Bearer ${await user.getIdToken(true)}`)
}
