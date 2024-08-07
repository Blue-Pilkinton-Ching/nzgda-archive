import { useEffect, useReducer, useState } from 'react'
import { Studio } from '../../../../types'
import Input from './../input'
import back from '../../../../public/images/back.svg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Button from '@/app/(components)/button'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth, User } from 'firebase/auth'
import { addStudio, editStudio as editStudioData } from '@/api/studios'

export interface StudioFormProps {
  edit: boolean
  studio?: Studio
}

interface FormState {
  description: string
  name: string
  website: string
}

type FormAction =
  | { type: 'description'; value: string }
  | { type: 'website'; value: string }
  | { type: 'name'; value: string }
  | { type: 'reset'; value: Studio }

function reducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'description':
      return { ...state, description: action.value }
    case 'website':
      return { ...state, website: action.value }
    case 'name':
      return { ...state, name: action.value }
    case 'reset':
      return {
        description: action.value.description,
        name: action.value.name,
        website: action.value.website,
      }
    default:
      return state
  }
}

export default function StudioForm({ edit, studio }: StudioFormProps) {
  const [formState, dispatchFormState] = useReducer(reducer, {
    description: '',
    name: '',
    website: '',
  })

  const [user] = useAuthState(getAuth())
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (studio) {
      dispatchFormState({ type: 'reset', value: studio })
    }
  }, [studio])

  async function createStudio() {
    let res

    setSaving(true)

    try {
      res = await addStudio(
        {
          name: formState.name,
          description: formState.description,
          website: formState.website,
        } as Studio,
        user as User
      )
    } catch (error) {
      alert('An error occured while adding partner')
      console.error(error)
      return
    }

    setSaving(false)

    switch (res.status) {
      case 200:
        router.push('/dashboard')
        return
      case 401:
        alert('You are Unauthorized to make that action')
        return
      case 500:
        alert('An error occured while adding studio')
        return
      default:
        alert('An unknown error occured')
        console.error(res.status, res.text, res.body)
        return
    }
  }

  async function editStudio() {
    let res

    setSaving(true)

    try {
      res = await editStudioData(
        {
          name: formState.name,
          description: formState.description,
          website: formState.website,
          id: studio?.id,
        } as Studio,
        user as User
      )
    } catch (error) {
      alert('An error occured while editing studio')
      console.error(error)
      return
    }

    setSaving(false)

    switch (res.status) {
      case 200:
        router.push('/dashboard')
        return
      case 401:
        alert('You are Unauthorized to make that action')
        return
      case 500:
        alert('An error occured while editing studio')
        return
      default:
        alert('An unknown error occured')
        console.error(res.status, res.text, res.body)
        return
    }
  }

  return (
    <>
      {saving ? (
        <p className="font-semibold m-3">Saving...</p>
      ) : (
        <>
          <div className="max-w-[600px] mx-auto text-left text-black">
            <div className="flex gap-4">
              <button
                onClick={() => router.push('/dashboard')}
                className={`duration-100 text-mainred ${
                  edit ? '*:mb-4' : ''
                } hover:scale-110 active:scale-95 hover:rotate-6 active:-rotate-12`}
              >
                <Image
                  src={back}
                  alt={back}
                  className="w-14 brightness-0"
                ></Image>
              </button>
              <div className="flex flex-col justify-center-center">
                <h1 className="text-4xl font-bold my-auto text-wrap">
                  {edit
                    ? formState.name
                      ? formState.name
                      : 'Loading'
                    : formState.name
                    ? formState.name
                    : 'New Studio'}
                </h1>
                {edit ? <h2 className="text-xl">{studio?.id}</h2> : null}
              </div>
            </div>
            <br />
            <form onSubmit={edit ? editStudio : createStudio}>
              <Input
                name={'Name'}
                value={formState.name}
                tooltip={'The name of the studio to display on the website.'}
                required
                maxLength={2000}
                onChange={(e) =>
                  dispatchFormState({
                    type: 'name',
                    value: e.currentTarget.value,
                  })
                }
              ></Input>
              <Input
                tooltip={
                  'The description of the studio to display on the website. There is a 2000 character limit.'
                }
                name={'Description'}
                value={formState.description}
                required
                maxLength={2000}
                onChange={(e) =>
                  dispatchFormState({
                    type: 'description',
                    value: e.currentTarget.value,
                  })
                }
              ></Input>
              <Input
                tooltip={'The website of the studio.'}
                name={'Website'}
                value={formState.website}
                required
                type="url"
                maxLength={2000}
                onChange={(e) =>
                  dispatchFormState({
                    type: 'website',
                    value: e.currentTarget.value,
                  })
                }
              ></Input>
              <div className="flex justify-center *:w-32 gap-4">
                <Button
                  inverted
                  className="bg-black text-white"
                  invertedClassName="bg-white text-black"
                >
                  {edit ? 'Save' : 'Add Studio'}
                </Button>
                {edit ? (
                  <Button
                    onClick={(e) => {
                      e.preventDefault()
                      dispatchFormState({
                        type: 'reset',
                        value: studio as Studio,
                      })
                    }}
                    className="bg-black text-white"
                    invertedClassName="bg-white text-black"
                  >
                    Reset
                  </Button>
                ) : null}
              </div>
            </form>
          </div>
        </>
      )}
    </>
  )
}
