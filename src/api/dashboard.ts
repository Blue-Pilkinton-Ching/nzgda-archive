import { User } from 'firebase/auth'
import request from 'superagent'

export async function getDashboardData(user: User) {
  return request
    .post(`/api/requests`)
    .send(user)
    .ok((res) => true)
    .set('Authorization', `Bearer ${await user.getIdToken(true)}`)
}
