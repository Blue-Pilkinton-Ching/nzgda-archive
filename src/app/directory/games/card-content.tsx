import Image from 'next/image'

import { Game } from '../../../../types'

export default function CardContent({ game }: { game: Game }) {
  return (
    <div className="relative rounded-lg lg:w-[150px] lg:h-[200px] w-[135px] h-[180px] flex shadow-md hover:cursor-pointer hover:scale-105 duration-100 active:scale-95">
      <Image
        src={game.thumbnail}
        alt={game.name}
        width={150}
        height={200}
        className="rounded-lg hidden lg:inline"
      ></Image>
      <Image
        src={game.thumbnail}
        alt={game.name}
        width={135}
        height={180}
        className="rounded-lg lg:hidden"
      ></Image>
      {game.isApp ? (
        <div className="bg-mainred absolute w-11 h-7 bottom-0 right-0 z-10 rounded-br-lg rounded-tl-lg text-white text-xs font-semibold">
          <p className="text-center items-center justify-center h-full flex">
            App
          </p>
        </div>
      ) : null}
    </div>
  )
}
