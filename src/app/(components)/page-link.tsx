import Link from 'next/link'
import Button from './button'

export default function PageLink({
  href,
  text,
  children,
}: {
  href: string
  text: string
  children?: React.ReactNode
}) {
  return (
    <>
      <Link
        className="hover:scale-105 active:scale-95 duration-200 text-white rounded-md bg-mainred py-1.5 px-3 flex flex-row items-center gap-4 text-lg font-medium"
        target="_blank"
        href={href}
      >
        {children}
        {text}
      </Link>
    </>
  )
}
