import Link from 'next/link'
import { Game } from '../../../types'
import Image from 'next/image'
import urlName from '@/utils/client/get-url-friendly-name'
import charactors from '../../../public/images/game-characters.png'

import { unstable_noStore as noStore } from 'next/cache'

export default async function Feature() {
  noStore()

  let feature: Game[] | undefined = undefined

  let data: Game[]
  try {
    // if (!data) {
    //   console.error('Data not on firebase for some reason')
    //   throw 'Data not on firebase for some reason'
    // }
    // feature = data.data.find((element) => element.featured)
  } catch (error) {
    console.error(error)
  }

  return (
    <>
      {feature != undefined ? (
        <div className="aspect-video h-full w-full max-h-[315px] xl:max-h-[min(27vw,450px)] hidden lg:block">
          {/* <Link href={`/game/${feature.id}/${urlName(feature.name)}`}> */}
          <Link href={`#`}>
            <div className="relative aspect-video max-h-[315px] xl:max-h-[min(27vw,450px)] lg:h-full xl:h-[min(27vw,450px)] float-right hover:scale-[1.03] active:scale-100 duration-100">
              {/* <Image
                quality={90}
                src={
                  feature.banner ||
                  `https://placehold.co/800x450.jpg?text=Placeholder`
                }
                alt="Placeholder"
                height={450}
                width={800}
                className="shadow-md rounded-xl w-auto h-full aspect-video lg:h-full xl:h-[min(27vw,450px)]"
              ></Image> */}
              <div className="absolute w-full bottom-0 lg:h-[72px] h-14 bg-gradient-to-t from-10% via-75% from-maingreen/90 via-maingreen/75 0 to-maingreen/0 rounded-b-lg">
                <div className="text-white drop-shadow-md translate-y-1 gap-1.5 flex text-center px-3 items-center justify-center w-full h-full my-auto text-2xl">
                  <p className="font-thin drop-shadow-md">Featured</p>
                  <p className="font-semibold drop-shadow-md">Game</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ) : (
        <div className="xl:mr-44 lg:mr-[12%] my-16 hidden sm:block float-right">
          <Image
            quality={75}
            src={charactors}
            alt="game-characters"
            width={400}
          ></Image>
        </div>
      )}
    </>
  )
}
