import Link from 'next/link'

const classes =
  'font-bold text-wrap text-xl hover:scale-105 active:scale-95 duration-100 inline'

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="flex justify-center lg:gap-8 flex-col *:lg:mx-0 lg:flex-row items-center *:w-full *:max-w-[300px] *:mx-auto *:lg:w-auto gap-5 text-center mt-12 *:rounded-lg *:px-6 *:py-2 *:bg-mainred text-white">
        <Link href={'/directory/about/whowhatwhy'} className={classes}>
          <p className="my-auto">The Who, What, & Why</p>
        </Link>
        <Link href={'/directory/about/faq'} className={classes}>
          <p className="my-auto">Help & FAQ</p>
        </Link>
        <Link href={'/directory/about/privacy'} className={classes}>
          <p className="my-auto">Privacy & Safety</p>
        </Link>
        <Link href={'/directory/about/contact'} className={classes}>
          <p className="my-auto">Contact Us</p>
        </Link>
      </div>
    </>
  )
}
