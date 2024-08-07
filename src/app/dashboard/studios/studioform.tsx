import { useEffect, useReducer } from 'react'
import { Studio } from '../../../../types'
import Input from './../input'
import back from '../../../../public/images/back.svg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export interface StudioFormProps {
  edit: boolean
  studio?: Studio
}

interface FormState {
  description: string
  name: string
}

type FormAction =
  | { type: 'description'; value: string }
  | { type: 'name'; value: string }
  | { type: 'reset'; value: Studio }

function reducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'description':
      return { ...state, description: action.value }
    case 'name':
      return { ...state, name: action.value }
    case 'reset':
      return { description: action.value.description, name: action.value.name }
    default:
      return state
  }
}

export default function StudioForm({ edit, studio }: StudioFormProps) {
  const [formState, dispatchFormState] = useReducer(reducer, {
    description: '',
    name: '',
  })

  const router = useRouter()

  useEffect(() => {
    if (studio) {
      dispatchFormState({ type: 'reset', value: studio })
    }
  }, [studio])

  return (
    <>
      <div className="max-w-[600px] mx-auto text-left text-black">
        <div className="flex gap-4">
          <button
            onClick={() => router.push('/dashboard')}
            className={`duration-100 text-mainred ${
              edit ? '*:mb-4' : ''
            } hover:scale-110 active:scale-95 hover:rotate-6 active:-rotate-12`}
          >
            <Image src={back} alt={back} className="w-14 brightness-0"></Image>
          </button>
          <div className="flex flex-col justify-center-center">
            <h1 className="text-4xl font-bold my-auto">
              {edit
                ? formState.name
                  ? formState.name
                  : 'Loading'
                : formState.name
                ? formState.name
                : 'New Studio'}
            </h1>
            {edit ? <h2 className="text-1xl">{studio?.id}</h2> : null}
          </div>
        </div>
        <br />

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
      </div>
    </>
  )
}
