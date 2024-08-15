import Background from '../(components)/background'
import GameBackground from '../(components)/game-background'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <GameBackground selectedMenu="studios">{children} </GameBackground>
}
