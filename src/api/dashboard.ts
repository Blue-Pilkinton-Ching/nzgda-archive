import { User } from 'firebase/auth'
import request from 'superagent'

const apiOrigin = process.env.API_ORIGIN

export async function getDashboardData(user: User) {
  return request
    .get(`${apiOrigin}/dashboard`)
    .ok((res) => true)
    .set('Authorization', `Bearer ${await user.getIdToken(true)}`)
}
