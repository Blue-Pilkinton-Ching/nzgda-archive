import Games from './games'
import Main from '../(components)/main'
import GameBackground from '../(components)/game-background'
import { SideContent } from '../(components)/side-content'

export default function Page() {
  return (
    <>
      <GameBackground selectedMenu="games">
        <Main SideContent={<SideContent />}>
          <Games />
        </Main>
      </GameBackground>
    </>
  )
}
