import styled from '@emotion/styled'
import { Formik, Form, Field } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { Button, TextField } from '@mui/material'

import {
  request,
  API_URL,
  type ForgotPasswordRequestValues,
  EMAIL_REGEX,
} from '../../utils/AppUtil'

const ForgotPasswordFormSchema = Yup.object({
  username: Yup.string()
    .matches(EMAIL_REGEX, {
      message: 'Invalid email',
    })
    .required('Required'),
})

const ForgotPasswordForm = () => {
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  return (
    <Wrapper data-testid="forgot-password-form">
      <FormMessageWrapper>
        {successMessage && (
          <FormSuccessMessage>{successMessage}</FormSuccessMessage>
        )}
        {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      </FormMessageWrapper>

      <Formik
        initialValues={
          {
            username: '',
          } as ForgotPasswordRequestValues
        }
        validationSchema={ForgotPasswordFormSchema}
        onSubmit={async (values: ForgotPasswordRequestValues) => {
          const response = await request('forgot-password', {
            username: values.username,
          } as ForgotPasswordRequestValues)

          try {
            const responseJson = await response.json()

            if (responseJson.status !== 200) {
              setErrorMessage('Submitted unsuccessfully')
              if (successMessage) setSuccessMessage('')
            } else {
              setSuccessMessage('Submitted successfully')
              if (errorMessage) setErrorMessage('')
            }
          } catch (err) {
            console.error('Server error', err)

            setErrorMessage('There was a problem submitting the form')
            if (successMessage) setSuccessMessage('')
          }
        }}
      >
        {({ errors, touched }) => (
          <FormWrapper id="forgotPasswordForm" method="POST" action={API_URL}>
            <FormRow>
              <FormColumn textAlign="left">
                <label htmlFor="username">Email*:</label>
                <Field
                  as={FormField}
                  id="username"
                  name="username"
                  // data-testid="username-input"
                  placeholder="john@example.com"
                  variant="outlined"
                  size="small"
                />
                {errors.username && touched.username ? (
                  <FormValidationMessage>
                    {errors.username}
                  </FormValidationMessage>
                ) : null}
              </FormColumn>
            </FormRow>
            <FormRow>
              <FormColumn alignItems="center">
                <FormButton type="submit" variant="outlined" size="medium">
                  Forgot Password
                </FormButton>
              </FormColumn>
            </FormRow>
          </FormWrapper>
        )}
      </Formik>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  @media (min-width: 834px) {
    place-items: center;
  }
`

const FormMessageWrapper = styled.div`
  padding: 16px;
`

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

const FormField = styled(TextField)`
  width: 100%;
  font-size: 1rem;
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

const FormValidationMessage = styled.div`
  color: #ff0000;
`

const FormButton = styled(Button)`
  font-size: 0.9rem;
  color: #333333;
  border-color: #333333;

  @media (min-width: 320px) {
    margin-top: 16px;
    width: 100%;
  }

  @media (min-width: 834px) {
    width: 50%;
  }
`

export default ForgotPasswordForm
