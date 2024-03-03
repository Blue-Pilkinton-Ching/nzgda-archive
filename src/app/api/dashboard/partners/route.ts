import { NextRequest, NextResponse } from 'next/server'

import '@/utils/server/init'
import getPrivilege from '@/utils/server/get-privilege'
import * as admin from 'firebase-admin'
import { GameListItem, UserPrivilege } from '../../../../../types'

export async function PATCH(req: NextRequest) {
  const res = await getPrivilege(req)

  const privilege = res.headers.get('privilege') as UserPrivilege

  const reqBody = await req.json()

  let statusCode = 500

  if (privilege === 'admin') {
    try {
      const updateData = async () => {
        const query = admin.firestore().collection('gameslist').limit(1)

        const doc = (await query.get()).docs[0]
        const data = doc.data() as {
          partners: { name: string; hidden: boolean }[]
        }

        data.partners[
          data.partners.findIndex((item) => item.name === reqBody.name)
        ].hidden = reqBody.hidden

        await doc.ref.set(data)
      }

      await updateData()

      statusCode = 200
    } catch (error) {
      console.error(error)
      statusCode = 500
    }
  } else {
    statusCode = 401
  }

  return new NextResponse(JSON.stringify({}), {
    headers: res.headers,
    status: statusCode,
  })
}