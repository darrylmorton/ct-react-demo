import styled from '@emotion/styled'
// import 'react-app-polyfill/ie11';
import { Formik, Form } from 'formik'
import { useState, useEffect } from 'react'
import * as Yup from 'yup'
import {
  EMAIL_REGEX,
  request,
  type FormValues,
  type RequestValues,
} from '../../util/AppUtil.ts'
import TextField from '@mui/material/TextField'

const SignupSchema = Yup.object().shape({
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
  const [formMessage, setFormMessage] = useState<string>('')
  const [formErrorMessage, setFormErrorMessage] = useState<string>('')

  useEffect(() => {}, [formMessage, formErrorMessage])

  return (
    <div>
      <Title>Signup Form</Title>
      {formMessage && <div>{formMessage}</div>}
      {formErrorMessage && (
        <FormErrorMessage>{formErrorMessage}</FormErrorMessage>
      )}

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

              setFormErrorMessage('Submitted unsuccessfully')
              if (formMessage) setFormMessage('')
            } else {
              setFormMessage('Submitted successfully')
              if (formErrorMessage) setFormErrorMessage('')
            }
          } catch (err) {
            console.error('Server error', err)

            setFormErrorMessage('There was a problem submitting the form')
            if (formMessage) setFormMessage('')
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
                <FormField
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
                <FormField
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
                <FormField
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
                <FormField
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
                <FormField
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
                <Button type="reset">Reset</Button>
              </FormColumn>
              <FormColumn alignItems="center">
                <Button type="submit">Signup</Button>
              </FormColumn>
            </FormRow>
          </FormWrapper>
        )}
      </Formik>
    </div>
  )
}

const Title = styled.div`
  color: #333333;
  font-size: 1.4rem;
`

const FormWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  place-items: center;
  width: 100%;
`

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px;
  width: 500px;
`

interface FormColumnProps {
  alignItems?: string
  textAlign?: string
}

const FormColumn = styled('div')<FormColumnProps>`
  display: flex;
  flex-direction: column;
  padding: 8px 32px;
  width: 100%;

  label {
    margin-bottom: 4px;
  }

  align-items: ${(props) => props.alignItems};
  text-align: ${(props) => props.textAlign};
`

const FormField = styled(TextField)`
  width: 100%;
  font-size: 1rem;
`

const FormErrorMessage = styled.div`
  color: #ff0000;
`

const Button = styled.button`
  width: 140px;
  margin-top: 16px;
  padding: 4px;
  font-size: 1rem;
`

export default SignupForm
