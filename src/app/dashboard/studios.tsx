import { IconButton } from '../(components)/iconButton'
import { FormEvent, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { User, getAuth } from 'firebase/auth'
import { MdDeleteForever, MdDone, MdEdit } from 'react-icons/md'

import { Studio } from '../../../types'
import Button from '../(components)/button'
import Confirm from './confirm'
import { addStudio, deleteStudioByID, editStudio } from '@/api/studios'

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
  const [editingStudio, setEditingStudio] = useState('')
  const [studios, setStudios] = useState<Studio[]>(oldStudios)

  const [studioName, setStudioName] = useState('')

  useEffect(() => {
    setStudios(oldStudios)
  }, [oldStudios])

  async function onEditPartner(studio: string) {
    if (editingStudio === studio) {
      if (editingStudio !== studioName) {
        setEditingStudio('')
        setStudioName('')

        let studio = studios.find((x) => x.name === editingStudio) as Studio

        studio.name = studioName

        let res
        try {
          res = await editStudio(studio, user as User)
        } catch (error) {
          alert('An error occured while setting new partner name')
          console.error(error)
          return
        }

        switch (res.status) {
          case 200:
            return
          case 401:
            alert('You are Unauthorized to make that action')
            return
          case 500:
            alert('An error occured while setting new partner name')
            return
          default:
            alert('An unknown error occured')
            console.error(res.status, res.text, res.body)
            return
        }
      }
    } else {
      setEditingStudio(studio)
      setStudioName(studio)
    }
  }

  async function deleteStudio() {
    let res
    try {
      res = await deleteStudioByID(studioToDelete, user as User)
    } catch (error) {
      alert('An error occured while deleting partner')
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
        alert('An error occured while deleting partner')
        return
      default:
        alert('An unknown error occured')
        console.error(res.status, res.text, res.body)
        return
    }
  }

  async function createStudio(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const currentTarget = event.currentTarget[0] as HTMLFormElement
    const studioName = currentTarget.value

    currentTarget.value = ''

    let res

    try {
      res = await addStudio(studioName, user as User)
    } catch (error) {
      alert('An error occured while adding partner')
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
        alert('An error occured while adding partner')
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
      <h1 className="text-4xl pl-2 font-bold">Studios</h1>

      <form
        onSubmit={createStudio}
        className="flex justify-between items-center gap-8"
      >
        <input
          minLength={3}
          maxLength={100}
          required
          type="text"
          placeholder="Enter new partner name..."
          className="py-0.5 mt-3 px-2 rounded-lg flex-1 border border-white focus:border-black outline-none text-lg"
        />
        <Button
          className="bg-black text-white"
          invertedClassName="bg-white text-black"
        >
          Add Studio
        </Button>
      </form>
      <br />
      <table className="w-full">
        <thead>
          <tr>
            <th className="pl-2">Partner</th>
            <th className="w-16 text-center">Edit</th>
            <th className="w-16 text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {studios.map((element, key) => {
            return (
              <tr key={key} className="even:bg-zinc-100 odd:bg-white">
                <td className="pl-2">
                  {editingStudio === element.name ? (
                    <>
                      <input
                        type="text"
                        className="bg-transparent outline-none shadow-md border border-black px-1.5 rounded-md -translate-x-2"
                        value={studioName}
                        onChange={(e) => setStudioName(e.target.value)}
                      />
                    </>
                  ) : (
                    element.name
                  )}
                </td>
                <td>
                  <IconButton onClick={() => onEditPartner(element.name)}>
                    {editingStudio === element.name ? (
                      <MdDone className="w-full" size={'35px'} />
                    ) : (
                      <MdEdit className="w-full" size={'30px'} />
                    )}
                  </IconButton>
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
