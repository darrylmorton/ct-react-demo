import styled from '@emotion/styled'
import { Formik, Form } from 'formik'
import { useState } from 'react'
import { Button } from '@mui/material'

import { request, API_URL, type LogoutRequestValues } from '../../utils/AppUtil'

const LogoutForm = () => {
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  return (
    <Wrapper>
      {successMessage && (
        <FormSuccessMessage>{successMessage}</FormSuccessMessage>
      )}
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}

      <Formik
        initialValues={{}}
        onSubmit={async () => {
          const authToken = localStorage.getItem('authToken')

          localStorage.removeItem('authToken')

          if (!authToken) {
            setErrorMessage('User is not logged in')
          } else {
            const response = await request('logout', {
              authToken,
            } as LogoutRequestValues)

            try {
              const responseJson = await response.json()
              console.log('responseJson.status', responseJson.status)

              if (responseJson.status !== 200) {
                setErrorMessage('Submitted unsuccessfully')
                if (successMessage) setSuccessMessage('')
              } else if (responseJson.status === 200) {
                setSuccessMessage('Submitted successfully')
                if (errorMessage) setErrorMessage('')
              } else {
                throw new Error('Request error')
              }
            } catch (err) {
              console.error('Server error', err)

              setErrorMessage('There was a problem submitting the form')
              if (successMessage) setSuccessMessage('')
            }
          }
        }}
      >
        {() => (
          <FormWrapper id="logoutForm" method="POST" action={API_URL}>
            <FormRow>
              <FormColumn alignItems="center">
                <FormButton type="submit" variant="outlined" size="medium">
                  Logout
                </FormButton>
              </FormColumn>
            </FormRow>
          </FormWrapper>
        )}
      </Formik>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const FormWrapper = styled(Form)`
  @media (min-width: 834px) {
    place-items: center;
  }
`

const FormRow = styled.div`
  display: flex;

  @media (min-width: 320px) {
    flex-direction: column;
  }

  @media (min-width: 834px) {
    flex-direction: row;
    width: 500px;
    padding: 8px;
  }
`

interface FormColumnProps {
  alignItems?: string
  textAlign?: string
}

const FormColumn = styled('div')<FormColumnProps>`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 4px;
  }

  align-items: ${(props) => props.alignItems};
  text-align: ${(props) => props.textAlign};

  @media (min-width: 320px) {
    margin: 4px 0;
  }

  @media (min-width: 834px) {
    padding: 8px 32px;
    width: 100%;
  }
`

const FormSuccessMessage = styled.div`
  color: #008000;
  text-align: center;
  font-size: 1.1rem;
`

const FormErrorMessage = styled.div`
  color: #ff0000;
  text-align: center;
  font-size: 1.1rem;
`

const FormButton = styled(Button)`
  margin-top: 16px;
  font-size: 1rem;
  color: #333333;
  border-color: #333333;

  @media (min-width: 320px) {
    width: 60%;
  }

  @media (min-width: 834px) {
    width: 40%;
  }
`

export default LogoutForm
