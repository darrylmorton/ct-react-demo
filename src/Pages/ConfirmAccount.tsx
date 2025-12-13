import styled from '@emotion/styled'

import ConfirmAccountForm from '../Components/Forms/ConfirmAccountForm.tsx'

function ConfirmAccount() {
  return (
    <Wrapper data-testid="confirm-account-page">
      <ConfirmAccountForm />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 32px;
`

export default ConfirmAccount
