import styled from '@emotion/styled'
// import 'react-app-polyfill/ie11';
import { Formik, Form, Field } from 'formik'
import { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { Button, TextField } from '@mui/material'

import {
  EMAIL_REGEX,
  request,
  API_URL,
  type LoginRequestValues,
} from '../../utils/AppUtil'

const LoginSchema = Yup.object({
  username: Yup.string()
    .matches(EMAIL_REGEX, {
      message: 'Required',
    })
    .required('Required'),
  password: Yup.string()
    .min(8, 'Required')
    .max(16, 'Required')
    .required('Required'),
})

const LoginForm = () => {
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {}, [successMessage, errorMessage])

  return (
    <Wrapper>
      {successMessage && (
        <FormSuccessMessage>{successMessage}</FormSuccessMessage>
      )}
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}

      <Formik
        initialValues={
          {
            username: '',
            password: '',
          } as LoginRequestValues
        }
        validationSchema={LoginSchema}
        onReset={() => {
          if (successMessage) setSuccessMessage('')
          if (errorMessage) setErrorMessage('')
        }}
        onSubmit={async (values: LoginRequestValues) => {
          const response = await request('login', {
            username: values.username,
            password: values.password,
          } as LoginRequestValues)

          try {
            const responseJson = await response.json()
            localStorage.setItem('authToken', responseJson.authToken)

            if (responseJson.status !== 200) {
              setErrorMessage('Submitted unsuccessfully')
              if (successMessage) setSuccessMessage('')
            } else if (responseJson.status === 200 && responseJson.authToken) {
              localStorage.setItem('authToken', responseJson.authToken)

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
        }}
      >
        {({ errors, touched }) => (
          <FormWrapper id="loginForm" method="POST" action={API_URL}>
            <FormRow>
              <FormColumn textAlign="left">
                <label htmlFor="username">Email*:</label>
                <Field
                  as={FormField}
                  id="username"
                  name="username"
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
              <FormColumn textAlign="left">
                <label htmlFor="password">Password*:</label>
                <Field
                  as={FormField}
                  id="password"
                  name="password"
                  placeholder="Password"
                  variant="outlined"
                  size="small"
                />
                {errors.password && touched.password ? (
                  <FormValidationMessage>
                    {errors.password}
                  </FormValidationMessage>
                ) : null}
              </FormColumn>
            </FormRow>
            <FormRow>
              <FormColumn alignItems="center">
                <FormButton type="submit" variant="outlined" size="medium">
                  Login
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
  margin-top: 16px;
  font-size: 1rem;
  color: #333333;
  border-color: #333333;

  @media (min-width: 320px) {
    width: 60%;
  }

  @media (min-width: 834px) {
    width: 50%;
  }
`

export default LoginForm
