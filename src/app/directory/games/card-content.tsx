import Image from 'next/image'

import { Game } from '../../../../types'

export default function CardContent({ game }: { game: Game }) {
  return (
    <div className="flex-col rounded-lg lg:w-[150px] w-[135px] flex hover:cursor-pointer hover:scale-105 duration-100 active:scale-95">
      <div className="relative">
        <Image
          src={game.thumbnail}
          alt={game.name}
          width={150}
          height={200}
          className="rounded-lg hidden lg:inline shadow-md"
        ></Image>
        <Image
          src={game.thumbnail}
          alt={game.name}
          width={135}
          height={180}
          className="rounded-lg lg:hidden shadow-md"
        ></Image>
        {game.isApp ? (
          <div className="bg-mainred absolute w-11 h-7 bottom-0 right-0 z-10 rounded-br-lg rounded-tl-lg text-white text-xs font-semibold">
            <p className="text-center items-center justify-center h-full flex">
              App
            </p>
          </div>
        ) : null}
      </div>
      <p className="text-center my-2 line-clamp-2 font-semibold text-ellipsis">
        {game.name}
      </p>
    </div>
  )
}
