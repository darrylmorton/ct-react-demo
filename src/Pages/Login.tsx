import styled from '@emotion/styled'

import LoginForm from '../Components/Forms/LoginForm.tsx'

function Login() {
  return (
    <Wrapper data-testid="login-page">
      <LoginForm />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 8px;
`

export default Login
