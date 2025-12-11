import styled from '@emotion/styled'
// import 'react-app-polyfill/ie11';
import { Formik, Form, Field } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { Button, TextField } from '@mui/material'

import {
  EMAIL_REGEX,
  request,
  type SignupFormValues,
  API_URL,
  type SignupRequestValues,
} from '../../utils/AppUtil'

const SignupSchema = Yup.object({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
  username: Yup.string()
    .matches(EMAIL_REGEX, {
      message: 'Invalid email',
    })
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(16, 'Too Long!')
    .required('Required'),
  confirmPassword: Yup.string()
    .min(8, 'Too Short!')
    .max(16, 'Too Long!')
    .equals([Yup.ref('password')], 'Passwords do not match')
    .required('Passwords do not match'),
})

const SignupForm = () => {
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  return (
    <Wrapper data-testid="signup-form">
      <FormMessageWrapper>
        {successMessage && (
          <FormSuccessMessage>{successMessage}</FormSuccessMessage>
        )}
        {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      </FormMessageWrapper>

      <Formik
        initialValues={
          {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            confirmPassword: '',
          } as SignupFormValues
        }
        validationSchema={SignupSchema}
        onReset={() => {
          if (successMessage) setSuccessMessage('')
          if (errorMessage) setErrorMessage('')
        }}
        onSubmit={async (values: SignupFormValues) => {
          const response = await request('signup', {
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.username,
            password: values.password,
          } as SignupRequestValues)

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
          <FormWrapper id="signupForm" method="POST" action={API_URL}>
            <FormRow>
              <FormColumn textAlign="left">
                <label htmlFor="firstName">First Name*:</label>
                <Field
                  as={FormField}
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  variant="outlined"
                  size="small"
                />
                {errors.firstName && touched.firstName ? (
                  <FormValidationMessage>
                    {errors.firstName}
                  </FormValidationMessage>
                ) : null}
              </FormColumn>
              <FormColumn textAlign="left">
                <label htmlFor="lastName">Last Name*:</label>
                <Field
                  as={FormField}
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  variant="outlined"
                  size="small"
                />
                {errors.lastName && touched.lastName ? (
                  <FormValidationMessage>
                    {errors.lastName}
                  </FormValidationMessage>
                ) : null}
              </FormColumn>
            </FormRow>
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
            </FormRow>
            <FormRow>
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
              <FormColumn textAlign="left">
                <label htmlFor="confirmPassword">Confirm Password*:</label>
                <Field
                  as={FormField}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  variant="outlined"
                  size="small"
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <FormValidationMessage>
                    {errors.confirmPassword}
                  </FormValidationMessage>
                ) : null}
              </FormColumn>
            </FormRow>
            <FormRow>
              <FormColumn alignItems="center">
                <FormButton type="reset" variant="outlined" size="medium">
                  Reset
                </FormButton>
              </FormColumn>
              <FormColumn alignItems="center">
                <FormButton type="submit" variant="outlined" size="medium">
                  Signup
                </FormButton>
              </FormColumn>
            </FormRow>
            <FormRow>
              <FormColumn alignItems="center">
                <FormLinkWrapper>
                  Already signed up? <a href="/login">Login</a>
                </FormLinkWrapper>
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
  margin-top: 8px;

  @media (min-width: 320px) {
    width: 50%;
  }

  @media (min-width: 834px) {
    width: 60%;
  }
`

export default SignupForm
