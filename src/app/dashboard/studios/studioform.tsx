import { useEffect, useReducer, useState } from 'react'
import { Link, Studio } from '../../../../types'
import Input from './../input'
import back from '../../../../public/images/back.svg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Button from '@/app/(components)/button'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth, User } from 'firebase/auth'
import { addStudio, editStudio as editStudioData } from '@/api/studios'
import { LinkInput } from '../link-input'

export interface StudioFormProps {
  edit: boolean
  studio?: Studio
}

interface FormState {
  description: string
  name: string
  website: string
  steam: string
  ios: string
  android: string
  yearFounded: number
  otherLinks: Link[]
  cityOrRegion: string
}

interface StudioState {
  description: string
  name: string
  website: string
  steam: string
  ios: string
  android: string
  yearFounded: number
  otherLinks: Link[]
  cityOrRegion: string
}

type FormAction =
  | { type: 'description'; value: string }
  | { type: 'website'; value: string }
  | { type: 'name'; value: string }
  | { type: 'steam'; value: string }
  | { type: 'ios'; value: string }
  | { type: 'android'; value: string }
  | { type: 'yearFounded'; value: string }
  | { type: 'cityOrRegion'; value: string }
  | { type: 'otherLinks'; value: Link[] }
  | { type: 'reset'; value: StudioState }

function reducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'description':
      return { ...state, description: action.value }
    case 'website':
      return { ...state, website: action.value }
    case 'name':
      return { ...state, name: action.value }
    case 'steam':
      return { ...state, steam: action.value }
    case 'ios':
      return { ...state, ios: action.value }
    case 'android':
      return { ...state, android: action.value }
    case 'yearFounded':
      return { ...state, yearFounded: Number(action.value) }
    case 'cityOrRegion':
      return { ...state, cityOrRegion: action.value }
    case 'otherLinks':
      return { ...state, otherLinks: action.value }
    case 'reset':
      return {
        description: action.value.description || '',
        name: action.value.name || '',
        website: action.value.website || '',
        steam: action.value.steam || '',
        ios: action.value.ios || '',
        android: action.value.android || '',
        yearFounded: action.value.yearFounded || 0,
        cityOrRegion: action.value.cityOrRegion || '',
        otherLinks: action.value.otherLinks,
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
    steam: '',
    ios: '',
    android: '',
    yearFounded: 0,
    otherLinks: [
      {
        label: '',
        url: '',
      },
    ],
    cityOrRegion: '',
  })

  const [user] = useAuthState(getAuth())
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (studio) {
      resetFormFromData(studio)
    }
  }, [studio])

  async function resetFormFromData(newStudio: Studio) {
    let links = (await JSON.parse(newStudio.otherLinks)) as Link[]

    if (links.length === 0) {
      links = [
        {
          label: '',
          url: '',
        },
      ]
    }

    const data = { ...newStudio, otherLinks: links } as StudioState

    dispatchFormState({ type: 'reset', value: data })
  }

  async function createStudio() {
    let res

    setSaving(true)

    try {
      res = await addStudio(
        {
          name: formState.name,
          description: formState.description,
          website: formState.website,
          steam: formState.steam,
          ios: formState.ios,
          android: formState.android,
          yearFounded: formState.yearFounded,
          cityOrRegion: formState.cityOrRegion,
          otherLinks: JSON.stringify(formState.otherLinks),
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
          steam: formState.steam,
          ios: formState.ios,
          android: formState.android,
          yearFounded: formState.yearFounded,
          cityOrRegion: formState.cityOrRegion,
          otherLinks: JSON.stringify(formState.otherLinks),
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
                type="textarea"
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
              <Input
                tooltip={'The steam page of the studio.'}
                name={'Steam Page'}
                value={formState.steam}
                type="url"
                maxLength={2000}
                onChange={(e) =>
                  dispatchFormState({
                    type: 'steam',
                    value: e.currentTarget.value,
                  })
                }
              ></Input>
              <Input
                tooltip={'The app store page for this studio.'}
                name={'IOS Page'}
                value={formState.ios}
                type="url"
                maxLength={2000}
                onChange={(e) =>
                  dispatchFormState({
                    type: 'ios',
                    value: e.currentTarget.value,
                  })
                }
              ></Input>
              <Input
                tooltip={'The play store page for this studio.'}
                name={'Android Page'}
                value={formState.android}
                type="url"
                maxLength={2000}
                onChange={(e) =>
                  dispatchFormState({
                    type: 'android',
                    value: e.currentTarget.value,
                  })
                }
              ></Input>
              <div className={`flex-col flex mb-3`}>
                <div className={`flex flex-col`}>
                  <label
                    htmlFor={'Custom Links'}
                    className="text-left text-base font-bold mb-1"
                  >
                    Custom Links
                  </label>
                  <p className={`text-zinc-500 text-sm mb-3 `}>
                    Add as many or as few as you want. Each link will be labeled
                    by the label, and link to the URL.
                  </p>
                </div>
                <div className="w-full flex gap-3 flex-row font-semibold mb-2">
                  <div className="w-full">Label</div>
                  <div className="w-full">URL</div>
                </div>
                {formState.otherLinks.map((link, index) => {
                  return (
                    <>
                      <LinkInput
                        required={link.label.length > 0 || link.url.length > 0}
                        key={index}
                        label={link.label}
                        url={link.url}
                        onChangeLabel={(label) => {
                          let links = formState.otherLinks

                          links[index] = {
                            label: label,
                            url: links[index].url,
                          }
                          if (index === formState.otherLinks.length - 1) {
                            links = [...links, { label: '', url: '' }]
                          } else {
                            links = [
                              ...links.filter(
                                (l, i) =>
                                  l.label.length > 0 ||
                                  l.url.length > 0 ||
                                  i === formState.otherLinks.length - 1
                              ),
                            ]
                          }

                          dispatchFormState({
                            type: 'otherLinks',
                            value: links,
                          })
                        }}
                        onChangeURL={(url) => {
                          let links = formState.otherLinks

                          links[index] = {
                            label: links[index].label,
                            url: url,
                          }

                          if (index === links.length - 1) {
                            links = [...links, { label: '', url: '' }]
                          } else {
                            links = [
                              ...links.filter(
                                (l, i) =>
                                  l.label.length > 0 ||
                                  l.url.length > 0 ||
                                  i === links.length - 1
                              ),
                            ]
                          }

                          dispatchFormState({
                            type: 'otherLinks',
                            value: links,
                          })
                        }}
                      ></LinkInput>
                    </>
                  )
                })}
              </div>
              <Input
                tooltip={'The year the studio was founded.'}
                name={'Year Founded'}
                value={formState.yearFounded.toString()}
                type="number"
                required
                maxLength={4}
                onChange={(e) =>
                  dispatchFormState({
                    type: 'yearFounded',
                    value: e.currentTarget.value,
                  })
                }
              ></Input>
              <Input
                tooltip={
                  'The city or region the studio is located in. Eg: Auckland, or Wellington Region'
                }
                name={'City'}
                value={formState.cityOrRegion}
                type="text"
                required
                maxLength={50}
                onChange={(e) =>
                  dispatchFormState({
                    type: 'cityOrRegion',
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
                      resetFormFromData(studio as Studio)
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
