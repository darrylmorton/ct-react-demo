import styled from '@emotion/styled'

import SignupForm from '../Components/Forms/SignupForm.tsx'

function Signup() {
  return (
    <Wrapper>
      <SignupForm />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 32px;
`

export default Signup
