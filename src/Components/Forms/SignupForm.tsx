import styled from '@emotion/styled'
// import 'react-app-polyfill/ie11';
import { Formik, Form, Field } from 'formik'
import { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { Button, TextField } from '@mui/material'

import {
  EMAIL_REGEX,
  request,
  type FormValues,
  type RequestValues,
} from '../../util/AppUtil'

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
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            confirmPassword: '',
          } as FormValues
        }
        validationSchema={SignupSchema}
        onSubmit={async (values: FormValues) => {
          const response = await request({
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.username,
            password: values.password,
          } as RequestValues)

          try {
            const responseJson = await response.json()
            console.log('responseJson.status', responseJson.status)

            if (responseJson.status !== 200) {
              console.error(responseJson.message)

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
          <FormWrapper
            id="signupForm"
            method="POST"
            action="http://localhost:3001/api/signup"
          >
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
                  <FormErrorMessage>{errors.firstName}</FormErrorMessage>
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
                  <FormErrorMessage>{errors.lastName}</FormErrorMessage>
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
                  <FormErrorMessage>{errors.username}</FormErrorMessage>
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
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
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
                  <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
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
          </FormWrapper>
        )}
      </Formik>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  //padding: 8px;
`

// const Title = styled.div`
//   color: #333333;
//   font-size: 1.4rem;
//   margin-bottom: 8px;
// `

const FormWrapper = styled(Form)`
  //display: block;
  //display: flex;
  //flex-direction: column;

  //width: 100%;

  //@media (min-width: 320px) {
  //  //flex-direction: row;
  //}

  @media (min-width: 834px) {
    place-items: center;
  }
`

const FormRow = styled.div`
  display: flex;
  //flex-direction: row;
  //padding: 8px;

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
  //padding: 8px 32px;
  //width: 100%;

  label {
    margin-bottom: 4px;
  }

  align-items: ${(props) => props.alignItems};
  text-align: ${(props) => props.textAlign};

  @media (min-width: 320px) {
    margin: 4px 0;

    //label {
    //  padding: 8px 0;
    //}
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

const FormButton = styled(Button)`
  width: 100%;
  //width: 140px;
  margin-top: 16px;
  //padding: 4px;
  font-size: 1rem;
  color: #333333;
  border-color: #333333;
`

export default SignupForm
