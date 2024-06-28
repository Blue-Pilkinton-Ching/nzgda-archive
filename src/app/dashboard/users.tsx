'use client'

import { IconButton } from '../(components)/iconButton'
import { Studio, Admin, UserTypes } from '../../../types'
import { FaCheck, FaXmark } from 'react-icons/fa6'
import { MdDeleteForever } from 'react-icons/md'
import Confirm from './confirm'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { allowPrivilegeRequest } from '@/api/requests'

export default function Users({
  className,
  requests: requestsProp,
  admins,
  studios,
  invalidateUsers,
}: {
  className: string
  requests: Admin[]
  admins: Admin[]
  studios: Studio[]
  invalidateUsers: () => void
}) {
  const [confirmText, setConfirmText] = useState('')
  const [confirmAction, setConfirmAction] = useState<() => void>()
  const [requests, setRequests] = useState<Admin[]>([])
  const [user] = useAuthState(getAuth())

  useEffect(() => {
    setRequests(requestsProp)
  }, [requestsProp])

  async function acceptAuthRequest(authRequest: Admin) {
    let res
    try {
      res = await allowPrivilegeRequest(authRequest, user as User)
    } catch (error) {
      alert('An error occured while adding user')
      console.error(error)
      return
    }
    switch (res.status) {
      case 200:
        invalidateUsers()
        return
      case 401:
        alert('You are Unauthorized to make that action')
        return
      case 500:
        alert('A server error occured while adding user')
        return
      default:
        alert('An unknown error occured')
        console.error(res.status, res.text, res.body)
        return
    }
  }

  async function deleteUser(deletedUser: Admin) {
    let res
    try {
      res = await fetch(`${process.env.API_BACKEND_URL}/dashboard/users`, {
        body: JSON.stringify({ user: deletedUser }),
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + (await user?.getIdToken(true)) },
      })
    } catch (error) {
      alert('An error occured while adding user')
      console.error(error)
      return
    }

    switch (res.status) {
      case 200:
        invalidateUsers()
        return
      case 401:
        alert('You are Unauthorized to make that action')
        return
      case 500:
        alert('A server error occured while deleting user')
        return
      default:
        alert('An unknown error occured')
        console.error(res.status, res.statusText, res.body)
        return
    }
  }

  async function denyAuthRequest(authRequest: Admin) {
    let res
    try {
      res = await fetch(`${process.env.API_BACKEND_URL}/dashboard/requests`, {
        body: JSON.stringify({ user: authRequest }),
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + (await user?.getIdToken(true)) },
      })
    } catch (error) {
      alert('An error occured while removing user')
      console.error(error)
      return
    }
    switch (res.status) {
      case 200:
        invalidateUsers()
        return
      case 401:
        alert('You are Unauthorized to make that action')
        return
      case 500:
        alert('An error occured removing user')
        return
      default:
        alert('An unknown error occured')
        console.error(res.status, res.statusText, res.body)
        return
    }
  }

  async function setUser(user: Admin, studioName: string) {
    setRequests(
      requests.map((request) => {
        if (request.uid === user.uid) {
          request.studio = studios.find((studio) => studio.name === studioName)
            ?.id as number
        }
        return request
      })
    )
  }

  return (
    <>
      <div className={className}>
        <Confirm
          text={confirmText}
          onConfirm={confirmAction || (() => {})}
          onCancel={() => setConfirmText('')}
        />
        <h1 className="pl-2 text-4xl font-bold">User Requests</h1>
        <br />
        <table className="w-full ">
          <thead>
            <tr className="*:p-1">
              <th>Email Address</th>
              <th className="w-14 text-left">Studio</th>
              <th className="w-14 text-center">Accept</th>
              <th className="w-14 text-center">Deny</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {requests.map((request, index) => {
              return (
                <tr key={index} className="*:p-1 odd:bg-white even:bg-pink-50">
                  <td>
                    <div>{request.email}</div>
                  </td>
                  <td>
                    <select
                      id="Partner / Studio"
                      name="Partner / Studio"
                      value={
                        studios.find((s) => s.id === request.studio)?.name ||
                        '-- select --'
                      }
                      onChange={(event) => setUser(request, event.target.value)}
                      className="cursor-pointer text-ellipsis max-w-44 py-0.5 px-2 rounded-lg flex-1 border-zinc-500 border shadow-md focus:border-black outline-none text-lg"
                    >
                      <option disabled>-- select --</option>
                      {studios.map((studio) => {
                        return (
                          <option key={studio.id} value={studio.name}>
                            {studio.name}
                          </option>
                        )
                      })}
                    </select>
                  </td>
                  <td>
                    <IconButton
                      onClick={() => {
                        if (request.studio) {
                          setConfirmAction(() => {
                            return () => {
                              acceptAuthRequest(request)
                            }
                          })
                          setConfirmText(
                            `Are you sure you want to add this user as a member of ${
                              studios.find((s) => s.id === request.studio)?.name
                            }?`
                          )
                        } else {
                          alert('You need to select a studio!')
                        }
                      }}
                    >
                      <FaCheck className="w-full" size={'30px'} />
                    </IconButton>
                  </td>
                  <td>
                    <IconButton
                      onClick={() => {
                        setConfirmAction(() => {
                          return () => {
                            denyAuthRequest(request)
                          }
                        })
                        setConfirmText(
                          'Are you sure you want to deny this users request?'
                        )
                      }}
                    >
                      <FaXmark className="w-full" size={'30px'} />
                    </IconButton>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <br />
      <br />
      <div className={className}>
        <h1 className="pl-2 text-4xl font-bold">Current Users</h1>
        <br />
        <table className="w-full ">
          <thead>
            <tr className="*:p-1">
              <th>Email Address</th>
              <th className="w-14 text-left">Studio</th>
              <th className="w-14 text-center">Revoke</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {admins.map((element, index) => {
              return (
                <tr key={index} className="*:p-1 odd:bg-white even:bg-pink-50">
                  <td>
                    <div>{element.email}</div>
                  </td>
                  <td>
                    <div className="text-nowrap">
                      {studios.find((x) => x.id === element.studio)?.name || (
                        <strong>Admin</strong>
                      )}
                    </div>
                  </td>
                  {element.studio === 0 ? null : (
                    <td>
                      <IconButton
                        onClick={() => {
                          setConfirmAction(() => {
                            return () => {
                              deleteUser(element)
                            }
                          })
                          setConfirmText(
                            'Are you sure you want to revoke the Authorization of this user? This action is irreversible.'
                          )
                        }}
                      >
                        <MdDeleteForever className="w-full" size={'30px'} />
                      </IconButton>
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
