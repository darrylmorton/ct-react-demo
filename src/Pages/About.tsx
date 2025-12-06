import styled from '@emotion/styled'

import { HamburgerMenu } from '../Components/Navigation/HamburgerMenu.tsx'

function About() {
  return (
    <Wrapper data-testid="about-page">
      <HamburgerMenu selectedPage="about" />
      <div>About</div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 32px;
`

export default About
