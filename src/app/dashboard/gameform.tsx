'use client'

import Button from '../(components)/button'
import back from '../../../public/images/back.svg'
import Input from './input'
import Image from 'next/image'
import '../../utils/client/firebase'
import { ChangeEvent, useEffect, useState } from 'react'
import { Game, Link, Studio } from '../../../types'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { User, getAuth } from 'firebase/auth'
import { addGame, editGameByID } from '@/api/game'
import { LinkInput } from './link-input'

export default function GameForm({
  edit,
  id,
  studios,
  game,
  admin,
}: {
  admin: boolean
  edit: boolean
  id?: number
  studios: Studio[]
  game?: Game
}) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [externalURL, setExternalURL] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [tags, setTags] = useState('')
  const [studio, setStudio] = useState<number>(0)
  const [displayAppBadge, setDisplayAppBadge] = useState(false)
  const [thumbnail, setThumbnail] = useState<File>()
  const [thumbnailWarning, setThumbnailWarning] = useState('')
  const [banner, setBanner] = useState<File>()
  const [bannerWarning, setBannerWarning] = useState('')
  const [isEducational, setIsEducational] = useState(false)

  const [steamLink, setSteamLink] = useState('`')
  const [iosLink, setIosLink] = useState('')
  const [androidLink, setAndriodLink] = useState('')
  const [websiteLink, setWebsiteLink] = useState('')

  const [links, setLinks] = useState<Link[]>([])

  const [yearOfRelease, setYearOfRelease] = useState(0)

  const [submitting, setSubmitting] = useState(false)

  const [user] = useAuthState(getAuth())
  const router = useRouter()

  useEffect(() => {
    resetGame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game])

  async function onGameInputChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    name: string
  ) {
    switch (name) {
      case 'Name':
        setName(event.target.value)
        break
      case 'Description':
        setDescription(event.target.value)
        break
      case 'IOS Link':
        setIosLink(event.target.value)
        break
      case 'Android Link':
        setAndriodLink(event.target.value)
        break
      case 'Website Link':
        setWebsiteLink(event.target.value)
        break
      case 'Steam Link':
        setSteamLink(event.target.value)
        break
      case 'Year of Release':
        setYearOfRelease(Number(event.target.value))
        break
      case 'Embed External Game or Trailer':
        setExternalURL(event.target.value)
        break
      case 'Max Width':
        setWidth(event.target.value)
        break
      case 'Max Height':
        setHeight(event.target.value)
        break
      case 'Tags':
        setTags(event.target.value)
        break
      case 'Studio':
        setStudio(studios.find((s) => s.name === event.target.value)?.id || -1)
        break
      case 'Downloadable App':
        setDisplayAppBadge(event.target.value === 'false')
        break
      case 'Change Thumbnail':
        const target = event.target as HTMLInputElement

        if (target.files && target.files[0]) {
          if (target.files.length > 1) {
            setThumbnailWarning('Only one file is allowed!')
            setThumbnail(undefined)
            break
          }
          if (target.files[0].size > 1048576 * 4) {
            setThumbnailWarning('File size should be less than 4mb!')
            setThumbnail(undefined)
            break
          }
          if (target.files[0].type !== 'image/png') {
            setThumbnailWarning('File should be an image!')
            setThumbnail(undefined)
            break
          }
          setThumbnailWarning('')
          setThumbnail(target.files[0])
        }
        break
      case 'Change Banner':
        const target3 = event.target as HTMLInputElement

        if (target3.files && target3.files[0]) {
          if (target3.files.length > 1) {
            setBannerWarning('Only one file is allowed!')
            setBanner(undefined)
            break
          }
          if (target3.files[0].size > 1048576 * 8) {
            setBannerWarning('File size should be less than 8mb!')
            setBanner(undefined)
            break
          }
          if (target3.files[0].type !== 'image/png') {
            setBannerWarning('File should be an image!')
            setBanner(undefined)
            break
          }
          setBannerWarning('')
          setBanner(target3.files[0])
        }
        break
      case 'Educational':
        setIsEducational(event.target.value === 'false')
        break
    }
  }

  async function formSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (thumbnailWarning || bannerWarning) {
      alert('Please fix the errors before submitting')
      return
    }

    let res
    if (edit && id) {
      setSubmitting(true)
      const form = new FormData()

      let data = {
        name,
        iosLink,
        androidLink,
        steamLink,
        websiteLink,
        yearOfRelease,
        url: externalURL,
        description,
        width: Number(width) ? Number(width) : null,
        height: Number(height) ? Number(height) : null,
        tags: tags,
        studio_id: admin ? studio : -1,
        isApp: displayAppBadge,
        educational: isEducational,
        otherLinks: JSON.stringify(links.slice(0, links.length - 1)),
      }

      form.append('data', JSON.stringify(data))

      if (thumbnail) {
        form.append('thumbnail', thumbnail)
      }

      if (banner) {
        form.append('banner', banner)
      }

      res = await editGameByID(form, user as User, (game as Game).id)
    } else if (thumbnail != undefined) {
      if (!externalURL && !banner) {
        alert(
          'You must upload a banner, embed a game trailer or provide an external game link'
        )
        return
      }
      setSubmitting(true)

      const form = new FormData()

      const data: any = {
        name,
        iosLink,
        androidLink,
        steamLink,
        websiteLink,
        yearOfRelease,
        description,
        url: externalURL,
        width: Number(width) ? Number(width) : null,
        height: Number(height) ? Number(height) : null,
        tags: tags,
        studio_id: admin ? studio : -1,
        isApp: displayAppBadge,
        educational: isEducational,
        approved: false,
        featured: false,
        hidden: false,
        otherLinks: JSON.stringify(links.slice(0, links.length - 1)),
      }

      form.append('data', JSON.stringify(data))

      form.append('thumbnail', thumbnail)

      if (banner) {
        form.append('banner', banner)
      }

      res = await addGame(form, user as User)
    } else {
      return
    }

    switch (res.status) {
      case 200:
        router.push('/dashboard')
        return
      case 401:
        alert('You are Unauthorized to make that action')
        setSubmitting(false)
        return
      case 500:
        alert('An error occured while saving the game')
        setSubmitting(false)
        return
      default:
        alert('An unknown error occured')
        setSubmitting(false)
        console.error(res.status, res.text, res.body)
        return
    }
  }

  async function resetGame() {
    setName(game?.name || '')
    setYearOfRelease(game?.yearOfRelease || 2024)
    setWebsiteLink(game?.websiteLink || '')
    setSteamLink(game?.steamLink || '')
    setIosLink(game?.iosLink || '')
    setAndriodLink(game?.androidLink || '')
    setDescription(game?.description || '')
    setExternalURL(game?.url || '')
    setWidth(game?.width?.toString() || '')
    setHeight(game?.height?.toString() || '')
    setTags(game?.tags?.toString() || '')
    setStudio(game?.studio_id || studios[0].id || 1)
    setDisplayAppBadge(game?.isApp || false)
    setIsEducational(game?.educational || false)

    if (game?.otherLinks) {
      const result = await JSON.parse(game?.otherLinks)

      setLinks(
        result || [
          {
            label: '',
            url: '',
          },
        ]
      )
    } else {
      setLinks([
        {
          label: '',
          url: '',
        },
      ])
    }
  }

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
            <h1 className="text-4xl font-bold my-auto text-wrap">
              {edit ? (!game ? 'Loading' : name) : name ? name : 'New Game'}
            </h1>
            <h2 className="text-1xl">{id}</h2>
          </div>
        </div>
        <br />
        <div className={submitting ? 'block' : 'hidden'}>
          <p>Submitting Game, please wait...</p>
        </div>
        <div className={submitting ? 'hidden' : 'block'}>
          {edit && !game ? (
            <p>Loading Game...</p>
          ) : (
            <form className={`flex-col mx-auto flex`} onSubmit={formSubmit}>
              <Input
                onChange={onGameInputChange}
                value={name}
                required
                maxLength={100}
                name={'Name'}
                tooltip="This is the name that will be displayed on the website"
              />
              <Input
                onChange={onGameInputChange}
                value={description}
                type="textarea"
                required
                maxLength={1000}
                name={'Description'}
                tooltip="This is the description people will see when they open your game. There is a 1000 character limit"
              />
              {admin ? (
                <>
                  <label
                    htmlFor="Studio"
                    className="text-left text-base font-bold mb-1"
                  >
                    Studio
                  </label>
                  <p className="text-zinc-500 text-sm mb-3">
                    Name of this games Studio
                  </p>
                  <select
                    id="Studio"
                    name="Studio"
                    value={studios.find((s) => s.id === studio)?.name}
                    onChange={(event) => onGameInputChange(event, 'Studio')}
                    className="cursor-pointer mb-3 py-0.5 px-2 rounded-lg flex-1 border-zinc-500 border shadow-md focus:border-black outline-none text-lg"
                  >
                    {studios.map((element) => {
                      return (
                        <option key={element.id} value={element.name}>
                          {element.name}
                        </option>
                      )
                    })}
                  </select>
                </>
              ) : null}
              <Input
                onChange={onGameInputChange}
                value={String(yearOfRelease)}
                type="number"
                tooltip="The year this game was or will be released"
                date
                required
                maxLength={4}
                name={'Year of Release'}
              />
              <Input
                onChange={onGameInputChange}
                value={tags}
                type="text"
                maxLength={200}
                name={'Tags'}
                tooltip="Comma seperated list of tags for this game"
              />
              <Input
                onChange={onGameInputChange}
                value={websiteLink}
                type="url"
                maxLength={2048}
                name={'Website Link'}
                tooltip="URL for this game's website"
              />
              <Input
                onChange={onGameInputChange}
                value={steamLink}
                type="url"
                maxLength={2048}
                name={'Steam Link'}
                tooltip="URL for this game's Steam Page"
              />
              <Input
                onChange={onGameInputChange}
                value={iosLink}
                type="url"
                maxLength={2048}
                name={'IOS Link'}
                tooltip="URL for this game on the App Store."
              />
              <Input
                onChange={onGameInputChange}
                value={androidLink}
                type="url"
                maxLength={2048}
                name={'Android Link'}
                tooltip="URL for this game on the Play Store."
              />
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
                {links.map((link, index) => {
                  return (
                    <>
                      <LinkInput
                        required={link.label.length > 0 || link.url.length > 0}
                        key={index}
                        label={link.label}
                        url={link.url}
                        onChangeLabel={(label) => {
                          setLinks((ls) => {
                            ls[index] = {
                              label: label,
                              url: ls[index].url,
                            }
                            if (index === ls.length - 1) {
                              return [...ls, { label: '', url: '' }]
                            } else {
                              return [
                                ...ls.filter(
                                  (l, i) =>
                                    l.label.length > 0 ||
                                    l.url.length > 0 ||
                                    i === ls.length - 1
                                ),
                              ]
                            }
                          })
                        }}
                        onChangeURL={(url) => {
                          setLinks((ls) => {
                            ls[index] = {
                              label: ls[index].label,
                              url: url,
                            }

                            if (index === ls.length - 1) {
                              return [...ls, { label: '', url: '' }]
                            } else {
                              return [
                                ...ls.filter(
                                  (l, i) =>
                                    l.label.length > 0 ||
                                    l.url.length > 0 ||
                                    i === ls.length - 1
                                ),
                              ]
                            }
                          })
                        }}
                      ></LinkInput>
                    </>
                  )
                })}
              </div>
              {/* <Input
                onChange={onGameInputChange}
                value={isEducational}
                type="checkbox"
                maxLength={0}
                name={'Educational'}
                tooltip="Display this game as having educational value"
              /> */}
              <Input
                onChange={onGameInputChange}
                value={displayAppBadge}
                tooltip={`Display this game in the 'Downloadable apps' catagory`}
                type="checkbox"
                maxLength={0}
                name={'Downloadable App'}
              />
              <br />
              <Input
                onChange={onGameInputChange}
                value={externalURL}
                type="url"
                maxLength={2048}
                name={'Embed External Game or Trailer'}
                tooltip="If you want to display the game trailer or if the game is hosted on another site, you can add the embed url here. Eg: https://www.youtube.com/embed/VBlFHuCzPgY?si=iU4Me3nVQNxmPcCj"
              />
              <Input
                onChange={onGameInputChange}
                value={width}
                type="number"
                maxLength={4}
                tooltip="If you aren't embedding a game, leave this value blank. If you are embedding a game, ideally your game's canvas should extend infinitely. If it does, leave this value blank. Otherwise enter the canvas's max width in px. (eg: 1920)"
                name={'Max Width'}
              />
              <Input
                onChange={onGameInputChange}
                value={height}
                type="number"
                maxLength={4}
                tooltip="Same as width, but for height. (eg: 1080)"
                name={'Max Height'}
              />
              <br />
              <>
                <label
                  htmlFor="Change Thumbnail"
                  className="text-left text-base font-bold mb-1"
                >
                  {edit ? 'Change Thumbnail' : 'Upload Thumbnail'}
                </label>
                <p className="text-zinc-500 text-sm mb-3">
                  Thumbnail should be 300x400px. Maximum size is 4mb.
                </p>
                <input
                  multiple={false}
                  type="file"
                  required={edit ? false : true}
                  name="Change Thumbnail"
                  accept="image/png"
                  id="Change Thumbnail"
                  onChange={(event) =>
                    onGameInputChange(event, 'Change Thumbnail')
                  }
                />
                <div className="py-3 text-rose-600">
                  {thumbnailWarning ? (
                    <p className="text-lg font-semibold">{thumbnailWarning}</p>
                  ) : thumbnail ? (
                    <div className="rounded-md shadow w-[150px] h-[200px]">
                      <Image
                        src={URL.createObjectURL(thumbnail)}
                        alt={'Uploaded Thumnail'}
                        className="rounded-md shadow"
                        width={256}
                        height={341}
                      ></Image>
                    </div>
                  ) : null}
                </div>
                <br />
                <label
                  htmlFor="Change Banner"
                  className="text-left text-base font-bold mb-1"
                >
                  {edit ? 'Change Banner' : 'Upload Banner'}
                </label>
                <p className="text-zinc-500 text-sm mb-3">
                  Banner should be a large 16/9 aspect. Reccomended size is
                  1424px x 801px.
                </p>

                <input
                  multiple={false}
                  type="file"
                  name="Change Banner"
                  accept="image/png"
                  id="Change Banner"
                  onChange={(event) =>
                    onGameInputChange(event, 'Change Banner')
                  }
                />
                <div className="py-3 text-rose-600">
                  {bannerWarning ? (
                    <p className="text-lg font-semibold">{bannerWarning}</p>
                  ) : banner ? (
                    <div className="rounded-md shadow w-[240px] h-[135px]">
                      <Image
                        src={URL.createObjectURL(banner)}
                        alt={'Uploaded Banner'}
                        className="rounded-md shadow"
                        width={360}
                        height={180}
                      ></Image>
                    </div>
                  ) : null}
                </div>
                <br />
              </>
              <div className="flex justify-center *:w-32 gap-4">
                <Button
                  inverted
                  className="bg-black text-white"
                  invertedClassName="bg-white text-black"
                >
                  {edit ? 'Save Game' : 'Add Game'}
                </Button>
                {edit ? (
                  <Button
                    onClick={(event) => {
                      event.preventDefault()
                      resetGame()
                    }}
                    className="bg-black text-white"
                    invertedClassName="bg-white text-black"
                  >
                    Reset
                  </Button>
                ) : null}
              </div>
            </form>
          )}
        </div>
        <br />
      </div>
    </>
  )
}
