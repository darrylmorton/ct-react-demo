import styled from '@emotion/styled'
import { Formik, Form, Field } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { Button, TextField } from '@mui/material'
import { useSearchParams } from 'react-router'

import {
  request,
  API_URL,
  type ResetPasswordRequestValues,
} from '../../utils/AppUtil'

const ResetPasswordSchema = Yup.object({
  resetPasswordToken: Yup.string()
    .min(8, 'Required')
    .max(200, 'Required')
    .required('Reset Password Token is Required'),
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

const ResetPasswordForm = () => {
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [searchParams] = useSearchParams()
  const resetPasswordToken = searchParams.get('resetPasswordToken') || ''

  // TODO error messages both inside and outside of form should not be possible at the same time
  return (
    <Wrapper data-testid="reset-password-form">
      <FormMessageWrapper>
        {successMessage && (
          <FormSuccessMessage>{successMessage}</FormSuccessMessage>
        )}
        {(errorMessage && (
          <FormErrorMessage>{errorMessage}</FormErrorMessage>
        )) ||
          (!resetPasswordToken && (
            <FormErrorMessage>Reset Password token is missing</FormErrorMessage>
          ))}
      </FormMessageWrapper>

      <Formik
        initialValues={
          {
            resetPasswordToken,
            password: '',
            confirmPassword: '',
          } as ResetPasswordRequestValues
        }
        validationSchema={ResetPasswordSchema}
        onSubmit={async (values: ResetPasswordRequestValues) => {
          const response = await request('reset-password', {
            resetPasswordToken: values.resetPasswordToken,
            password: values.password,
          } as ResetPasswordRequestValues)

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
          <FormWrapper id="resetPasswordForm" method="POST" action={API_URL}>
            <Field
              id="resetPasswordToken"
              name="resetPasswordToken"
              data-testid="reset-password-token-input"
              type="hidden"
              value={resetPasswordToken}
            />
            {errors.resetPasswordToken && touched.resetPasswordToken ? (
              <FormValidationMessage>
                {errors.resetPasswordToken}
              </FormValidationMessage>
            ) : null}
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
                <FormButton type="submit" variant="outlined" size="medium">
                  Reset Password
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

const FormButton = styled(Button)`
  margin-top: 16px;
  font-size: 1rem;
  color: #333333;
  border-color: #333333;
  text-transform: none;
  width: 160px;
`

export default ResetPasswordForm
