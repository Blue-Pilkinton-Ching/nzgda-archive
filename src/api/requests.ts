import request from 'superagent'

export async function requestPrivilege(uid: string) {
  const res = await request
    .post(`/api/requests`)
    .send({ uid })
    .ok((res) => true)

  return res
}

export async function getAllPrivilegeRequests() {
  const res = await request.get(`/api/requests`).ok((res) => true)

  return res
}

export async function allowPrivilegeRequest(uid: string, studio: number) {
  const res = await request
    .patch(`/api/requests`)
    .send({ uid, studio })
    .ok((res) => true)

  return res
}

export async function denyPrivilegeRequest(uid: string) {
  const res = await request
    .post(`/api/requests`)
    .send({ uid })
    .ok((res) => true)

  return res
}
