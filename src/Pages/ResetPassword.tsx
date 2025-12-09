import styled from '@emotion/styled'

import ResetPasswordForm from '../Components/Forms/ResetPasswordForm.tsx'

function ResetPassword() {
  return (
    <Wrapper data-testid="reset-password-page">
      <ResetPasswordForm />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 32px;
`

export default ResetPassword
