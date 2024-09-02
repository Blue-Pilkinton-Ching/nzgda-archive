import * as React from 'react'
import GameBackground from '../(components)/game-background'
import Main from '../(components)/main'
import { SideContent } from '../(components)/side-content'

export interface ILayoutProps {
  children: React.ReactNode
}

export default function Layout(props: ILayoutProps) {
  return (
    <GameBackground>
      <Main SideContent={<SideContent />}>{props.children}</Main>
    </GameBackground>
  )
}
