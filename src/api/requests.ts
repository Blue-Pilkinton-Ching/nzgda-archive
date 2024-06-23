import request from 'superagent'

export async function requestPrivilege(email: string) {
  const res = await request.post(`/api/requests`).send({ email })

  return res
}

export async function getAllPrivilegeRequests() {
  const res = await request.get(`/api/requests`)

  return res
}

export async function allowPrivilegeRequest(email: string, studio: number) {
  const res = await request.patch(`/api/requests`).send({ email, studio })

  return res
}

export async function denyPrivilegeRequest(email: string) {
  const res = await request.post(`/api/requests`).send({ email })

  return res
}
