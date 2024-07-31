import Games from './games'
import Main from '../(components)/main'

export default function Page() {
  return (
    <>
      <Main
        description={
          <>
            The NZGDA games directory is the official archive of New Zealand
            made video games. <br />
            <br />
            Discover our games and the kiwi companies that made them.
          </>
        }
      >
        <Games />
      </Main>
    </>
  )
}
