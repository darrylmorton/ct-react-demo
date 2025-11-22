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
  //display: block;
  //flex-direction: column;

  //justify-content: center;
  //text-align: center;
  //padding: 32px;
  padding: 8px;

  //@media (min-width: 420px) {
  //  flex-direction: row;
  //}
`

export default Signup
