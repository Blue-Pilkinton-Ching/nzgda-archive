import { User } from 'firebase/auth'
import request from 'superagent'

export async function getDashboardData(user: User) {
  return request
    .get(`/api/dashboard`)
    .ok((res) => true)
    .set('Authorization', `Bearer ${await user.getIdToken(true)}`)
}
