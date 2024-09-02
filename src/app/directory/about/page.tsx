import Link from 'next/link'
import Image from 'next/image'

import back from '../../../../public/images/back.svg'

const classes =
  'font-bold text-wrap sm:text-3xl text-2xl hover:*:underline hover:brightness-75 duration-100 *:mb-4 inline'

export default function Page() {
  return (
    <div className="flex justify-center flex-col items-center">
      <Link href={'/about/whowhatwhy'} className={classes}>
        <p className="inline-block">The Who, What, & Why</p>
        <br />
      </Link>
      <Link href={'/about/faq'} className={classes}>
        <p className="inline-block">Help & FAQ</p>
        <br />
      </Link>

      <Link href={'/about/privacy'} className={classes}>
        <p className="inline-block">Privacy & Safety</p>
        <br />
      </Link>
      <Link href={'/about/contact'} className={classes}>
        <p className="inline-block">Contact Us</p>
        <br />
      </Link>
      <br />
      <Link
        href={'/directory/games'}
        className="duration-100 text-mainred *:mb-4 hover:scale-125 active:scale-95 hover:rotate-12 active:-rotate-12 "
      >
        <Image src={back} alt={back} className="w-14 "></Image>
      </Link>
    </div>
  )
}
