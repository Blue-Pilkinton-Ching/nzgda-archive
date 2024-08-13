import GameBackground from '@/app/(components)/game-background'
import * as React from 'react'

export interface ILayoutProps {
  children: React.ReactNode
}

export default function Layout(props: ILayoutProps) {
  return (
    <GameBackground selectedMenu="studios">{props.children} </GameBackground>
  )
}
