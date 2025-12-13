import styled from '@emotion/styled'

import ForgotPasswordForm from '../Components/Forms/ForgotPasswordForm.tsx'

function ForgotPassword() {
  return (
    <Wrapper data-testid="forgot-password-page">
      <ForgotPasswordForm />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 32px;
`

export default ForgotPassword
