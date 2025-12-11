import styled from '@emotion/styled'
// import 'react-app-polyfill/ie11';
import { Formik, Form, Field } from 'formik'
import { useState } from 'react'
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

  return (
    <Wrapper data-testid="login-form">
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
            <FormRow>
              <FormColumnExt textAlign="right">
                <FormLinkWrapper>
                  No account? <a href="/signup">Signup</a>
                </FormLinkWrapper>
              </FormColumnExt>
              <FormColumnExt textAlign="left">
                <FormLinkWrapper>
                  <a href="/forgot-password">Forgot Password</a>?
                </FormLinkWrapper>
              </FormColumnExt>
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
  border: solid 1px #bdbcbc;
  border-radius: 16px;
  padding: 24px;
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
    margin: 8px 0;
  }

  @media (min-width: 834px) {
    padding: 0 32px;
    width: 100%;
  }
`

const FormColumnExt = styled(FormColumn)`
  @media (min-width: 320px) {
    margin: 0;
    align-items: center;
  }

  @media (min-width: 834px) {
    padding: 0 16px;
    align-items: normal;

    text-align: ${(props) => props.textAlign};
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

const FormLinkWrapper = styled.div`
  @media (min-width: 320px) {
    padding-top: 16px;
  }

  @media (min-width: 834px) {
    padding: 0;
  }
`

const FormButton = styled(Button)`
  font-size: 0.9rem;
  color: #333333;
  border-color: #333333;

  @media (min-width: 320px) {
    margin-top: 16px;
    width: 40%;
  }

  @media (min-width: 834px) {
    margin-top: 8px;
    width: 30%;
  }
`

export default LoginForm
