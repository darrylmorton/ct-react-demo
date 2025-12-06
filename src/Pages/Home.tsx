import styled from '@emotion/styled'

import HamburgerMenu from '../Components/Navigation/HamburgerMenu.tsx'

function Home() {
  return (
    <Wrapper data-testid="home-page">
      <HamburgerMenu selectedPage="home" />
      <div>Home</div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 32px;
`

export default Home
