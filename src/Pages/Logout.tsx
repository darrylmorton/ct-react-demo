import styled from '@emotion/styled'

import LogoutForm from '../Components/Forms/LogoutForm.tsx'

function Logout() {
  return (
    <Wrapper>
      <LogoutForm />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 8px;
`

export default Logout
