import {
  MdArchive,
  MdClose,
  MdDelete,
  MdDeleteForever,
  MdDone,
  MdModeEdit,
  MdUnarchive,
} from 'react-icons/md'
import { IconButton } from '../(components)/iconButton'
import { Game } from '../../../types'
import { useAuthState } from 'react-firebase-hooks/auth'
import { User, getAuth } from 'firebase/auth'
import { useEffect, useState } from 'react'
import Confirm from './confirm'
import { useRouter } from 'next/navigation'
import Button from '../(components)/button'
import Link from 'next/link'
import { FaCrown } from 'react-icons/fa'
import { GoDotFill } from 'react-icons/go'
import { editGameByID, deleteGameByID } from '@/api/game'

export default function Games({
  games,
  hiddenGames,
  className,
  invalidateGames,
  admin,
  unApprovedGames,
}: {
  admin: boolean
  games: Game[]
  hiddenGames: Game[]
  unApprovedGames?: Game[]
  className: string
  invalidateGames: () => void
}) {
  const [user] = useAuthState(getAuth())

  const [currentGames, setCurrentGames] = useState<Game[]>([])
  const [deleteText, setDeleteText] = useState('')
  const [hideText, setHideText] = useState('')

  const [gameToDelete, setGameToDelete] = useState(0)
  const [gameToHide, setGameToHide] = useState<Game>()

  const router = useRouter()

  useEffect(() => {
    setCurrentGames(games)
  }, [games])

  async function onToggleVisibility(game: Game) {
    const shouldHide = !game.hidden

    let res

    try {
      const form = new FormData()

      form.append(
        'data',
        JSON.stringify({
          hidden: shouldHide,
        })
      )

      res = await editGameByID(form, user as User, game.id)
    } catch (error) {
      alert('An error occured while setting game visibility')
      console.error(error)
      return
    }

    switch (res.status) {
      case 200:
        invalidateGames()
        return
      case 401:
        alert('You are Unauthorized to make that action')
        return
      case 500:
        alert('An error occured while setting game visibility')
        return
      default:
        alert('An unknown error occured')
        console.error(res.status, res.text, res.body)
        return
    }
  }

  async function onApprove(game: Game) {
    let res

    try {
      let form = new FormData()

      const data = JSON.stringify({ approved: true })

      form.append('data', data)

      res = await editGameByID(form, user as User, game.id)
    } catch (error) {
      alert('An error occured while approving game')
      console.error(error)
      return
    }

    switch (res.status) {
      case 200:
        invalidateGames()
        return
      case 401:
        alert('You are Unauthorized to make that action')
        return
      case 500:
        alert('An error occured while approving game')
        return
      default:
        alert('An unknown error occured')
        console.error(res.status, res.text, res.body)
        return
    }
  }

  async function deleteGame() {
    let res
    try {
      res = await deleteGameByID(gameToDelete, user as User)
    } catch (error) {
      alert(`'An error occured while deleting game ${gameToDelete}'`)
      console.error(error)
      return
    }

    switch (res.status) {
      case 200:
        invalidateGames()
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

  async function onToggleFeature(listItem: Game) {
    const shouldFeature = !(listItem.featured || false)

    let res

    setCurrentGames(
      currentGames.map((x) => {
        if (x.id === listItem.id) {
          x.featured = shouldFeature
        } else {
          x.featured = false
        }
        return x
      })
    )

    try {
      let form = new FormData()

      const data = JSON.stringify({ featured: shouldFeature })

      form.append('data', data)

      res = await editGameByID(form, user as User, listItem.id)
    } catch (error) {
      alert('An error occured while setting game feature')
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
        alert('An error occured while setting game feature')
        return
      default:
        alert('An unknown error occured')
        console.error(res.status, res.text, res.body)
        return
    }
  }

  return (
    <div className={`shadow-lg p-4 rounded ${className}`}>
      <Confirm
        text={deleteText}
        onConfirm={() => deleteGame()}
        onCancel={() => setDeleteText('')}
      />
      <Confirm
        text={hideText}
        onConfirm={() => onToggleVisibility(gameToHide as Game)}
        onCancel={() => setHideText('')}
      />
      {admin && unApprovedGames && unApprovedGames.length > 0 ? (
        <>
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold">Unapproved Games</h1>
            <Link href={'/games?admin=true'} className="mb-4">
              <Button
                className="bg-black text-white float-right mt-0"
                invertedClassName="bg-white text-black"
              >
                View Unapproved Games
              </Button>
            </Link>
          </div>

          <table className="w-full">
            <thead>
              <tr className="*:p-1">
                <th className="w-14">ID</th>
                <th>Name</th>
                <th className={`w-14 text-center`}>Approve</th>
                <th className="w-14 text-center">Reject</th>
              </tr>
            </thead>
            <tbody>
              {unApprovedGames.map((element, index) => {
                return (
                  <tr
                    key={index}
                    className="*:p-1 odd:bg-white even:bg-zinc-100"
                  >
                    <td>{element.id}</td>
                    <td>
                      <div
                        className="hover:underline cursor-pointer"
                        onClick={() =>
                          router.push(`/dashboard/edit/${element.id}`)
                        }
                      >
                        {element.name}
                      </div>
                    </td>
                    <td className={` ${admin ? '' : 'hidden'}`}>
                      <IconButton
                        onClick={() => {
                          onApprove(element)
                        }}
                      >
                        <MdDone className="w-full" size={'28px'} />
                      </IconButton>
                    </td>
                    <td>
                      <IconButton
                        onClick={() => {
                          setDeleteText(
                            `Are you sure you want to reject this game proposal?`
                          )
                          setGameToDelete(element.id)
                        }}
                      >
                        <MdClose className="w-full" size={'28px'} />
                      </IconButton>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <br />
          <br />
        </>
      ) : null}

      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Games</h1>
        <Link href={'/dashboard/add'} className="mb-4">
          <Button
            className="bg-black text-white float-right mt-0"
            invertedClassName="bg-white text-black"
          >
            Add New Game
          </Button>
        </Link>
      </div>

      <table className="w-full">
        <thead>
          <tr className="*:p-1">
            <th className="w-14">ID</th>
            <th>Name</th>
            <th className={`w-14 text-center ${admin ? '' : 'hidden'}`}>
              Feature
            </th>
            <th className="w-14 text-center">Edit</th>
            <th className="w-14 text-center">{admin ? 'Archive' : 'Delete'}</th>
          </tr>
        </thead>
        <tbody>
          {games.map((element, index) => {
            return (
              <tr key={index} className="*:p-1 odd:bg-white even:bg-zinc-100">
                <td>{element.id}</td>
                <td>
                  <div
                    className="hover:underline cursor-pointer"
                    onClick={() => router.push(`/dashboard/edit/${element.id}`)}
                  >
                    {element.name}
                  </div>
                </td>
                <td className={`${admin ? '' : 'hidden'} w-14`}>
                  <IconButton
                    onClick={() => {
                      onToggleFeature(element)
                    }}
                  >
                    {element.featured ? (
                      <FaCrown className="w-full" size={'28px'} />
                    ) : (
                      <GoDotFill className="w-full" size={'22px'} />
                    )}
                  </IconButton>
                </td>
                <td>
                  <IconButton
                    onClick={() => router.push(`/dashboard/edit/${element.id}`)}
                  >
                    <MdModeEdit className="w-full" size={'30px'} />
                  </IconButton>
                </td>
                <td>
                  <IconButton
                    onClick={() => {
                      setHideText(
                        `Are you sure you want to ${
                          admin ? 'archive' : 'delete'
                        } this game?`
                      )
                      setGameToHide(element)
                    }}
                  >
                    {admin ? (
                      <MdArchive className="w-full" size={'30px'} />
                    ) : (
                      <MdDelete className="w-full" size={'30px'} />
                    )}
                  </IconButton>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {hiddenGames.length > 0 && admin ? (
        <>
          <br />
          <br />
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold mb-3">Archived Games</h1>
          </div>

          <table className="w-full">
            <thead>
              <tr className="*:p-1">
                <th>ID</th>
                <th>Name</th>
                <th className="w-14 text-center">Unarchive</th>
                <th className="w-28 text-center">Perm Delete</th>
              </tr>
            </thead>
            <tbody>
              {hiddenGames.map((element, index) => {
                return (
                  <tr
                    key={index}
                    className="*:p-1 odd:bg-white even:bg-zinc-100"
                  >
                    <td>{element.id}</td>
                    <td>
                      <div
                        className="hover:underline cursor-pointer"
                        onClick={() =>
                          router.push(`/dashboard/edit/${element.id}`)
                        }
                      >
                        {element.name}
                      </div>
                    </td>
                    <td>
                      <IconButton
                        onClick={() => {
                          onToggleVisibility(element)
                        }}
                      >
                        <MdUnarchive className="w-full" size={'30px'} />
                      </IconButton>
                    </td>
                    <td>
                      <IconButton
                        onClick={() => {
                          setGameToDelete(element.id)
                          setDeleteText(
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
        </>
      ) : null}
    </div>
  )
}
