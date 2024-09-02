import React from 'react'

export default function H1({
  children,
  href = '',
}: {
  children: React.ReactNode
  href?: string
}) {
  return <h1 className="text-4xl font-bold flex">{children}</h1>
}
