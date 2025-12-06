import styled from '@emotion/styled'

import SignupForm from '../Components/Forms/SignupForm.tsx'

function Signup() {
  return (
    <Wrapper data-testid="signup-page">
      <SignupForm />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 8px;
`

export default Signup
