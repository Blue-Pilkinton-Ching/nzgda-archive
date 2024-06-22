import superagent from 'superagent'

export async function requestPrivilege(email: string) {
  const res = await superagent.post(`/api/requests`).send({ email })

  return res
}

export async function getAllPrivilegeRequests() {
  const res = await superagent.get(`/api/requests`)

  return res
}

export async function allowPrivilegeRequest(email: string, studio: number) {
  const res = await superagent.patch(`/api/requests`).send({ email, studio })

  return res
}

export async function denyPrivilegeRequest(email: string) {
  const res = await superagent.post(`/api/requests`).send({ email })

  return res
}
