import Image from 'next/image'

import charactors from '../../../public/images/game-characters.png'
import logo from '../../../public/images/game-logo.png'
import Games from './games'

export default function Page() {
  return (
    <>
      <section className="flex justify-between items-center">
        <div>
          <div className="lg:w-[350px] min-w-[240px] w-[65%]">
            <Image quality={100} src={logo} alt="game-characters"></Image>
          </div>
          <br />
          <p className="lg:max-w-[500px] sm:max-w-[350px] lg:text-lg mb-5 sm:mb-0">
            Play, laugh, and learn! HEIHEI tākaro is a safe place for our
            tamariki. Watch shows on TVNZ On Demand, or Play games right here.
          </p>
        </div>
        <div className="xl:mr-44 lg:mr-[6%] my-16 hidden sm:block">
          <Image
            quality={75}
            src={charactors}
            alt="game-characters"
            width={400}
          ></Image>
        </div>
      </section>
      <section>
        <h3 className="text-3xl font-bold text-green">Games</h3>
        <Games />
      </section>
    </>
  )
}
