import { IconButton } from '../(components)/iconButton'
import { FormEvent, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { User, getAuth } from 'firebase/auth'
import { MdDeleteForever, MdDone, MdEdit } from 'react-icons/md'

import { Studio } from '../../../types'
import Button from '../(components)/button'
import Confirm from './confirm'
import { addStudio, deleteStudioByID, editStudio } from '@/api/studios'
import Link from 'next/link'

export default function Studios({
  className,
  studios: oldStudios,
  invalidateStudios: invalidateStudios,
}: {
  className: string
  studios: Studio[]
  invalidateStudios: () => void
}) {
  const [user] = useAuthState(getAuth())

  const [confirmText, setConfirmText] = useState('')
  const [studioToDelete, setStudioToDelete] = useState(0)
  const [studios, setStudios] = useState<Studio[]>(oldStudios)

  useEffect(() => {
    setStudios(oldStudios)
  }, [oldStudios])

  async function deleteStudio() {
    let res
    try {
      res = await deleteStudioByID(studioToDelete, user as User)
    } catch (error) {
      alert('An error occured while deleting studio')
      console.error(error)
      return
    }

    switch (res.status) {
      case 200:
        invalidateStudios()
        return
      case 401:
        alert('You are Unauthorized to make that action')
        return
      case 500:
        alert('An error occured while deleting Studio')
        return
      default:
        alert('An unknown error occured')
        console.error(res.status, res.text, res.body)
        return
    }
  }

  return (
    <div className={className}>
      <Confirm
        text={confirmText}
        onConfirm={deleteStudio}
        onCancel={() => setConfirmText('')}
      />
      <div className="flex justify-between">
        <h1 className="text-4xl pl-2 font-bold">Studios</h1>
        <Link href={'/dashboard/studios/add'} className="mb-4">
          <Button
            className="bg-black text-white"
            invertedClassName="bg-white text-black"
          >
            Add Studio
          </Button>
        </Link>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="pl-2">Name</th>
            <th className="w-16 text-center">Edit</th>
            <th className="w-16 text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {studios.map((element, key) => {
            return (
              <tr key={key} className="even:bg-zinc-100 odd:bg-white">
                <td className="pl-2">
                  <Link
                    className="hover:underline"
                    href={`/dashboard/studios/edit/${element.id}`}
                  >
                    {element.name}
                  </Link>
                </td>
                <td>
                  <Link href={`/dashboard/studios/edit/${element.id}`}>
                    <IconButton onClick={() => {}}>
                      <MdEdit className="w-full" size={'30px'} />
                    </IconButton>
                  </Link>
                </td>
                <td>
                  <IconButton
                    onClick={() => {
                      setStudioToDelete(element.id)
                      setConfirmText(
                        'Are you sure you want to delete this partner? This action is irreversible.'
                      )
                    }}
                  >
                    <MdDeleteForever className="w-full" size={'30px'} />
                  </IconButton>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
