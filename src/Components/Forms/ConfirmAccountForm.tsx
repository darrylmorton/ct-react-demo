import styled from '@emotion/styled'
import { Formik, Form, Field } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { Button } from '@mui/material'
import { useSearchParams } from 'react-router'

import {
  request,
  API_URL,
  type ConfirmAccountRequestValues,
  REGEX_JWT,
} from '../../utils/AppUtil'

const ConfirmAccountSchema = Yup.object({
  confirmAccountToken: Yup.string()
    .matches(REGEX_JWT, {
      message: 'Invalid confirm account token format',
    })
    .required('Invalid confirm account token format'),
})

const ConfirmAccountForm = () => {
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [searchParams] = useSearchParams()
  const confirmAccountToken = searchParams.get('confirmAccountToken') || ''

  return (
    <Wrapper data-testid="confirm-account-form">
      {successMessage && (
        <FormSuccessMessage>{successMessage}</FormSuccessMessage>
      )}
      {(errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>) ||
        (!confirmAccountToken && (
          <FormErrorMessage>
            Account confirmation token is missing
          </FormErrorMessage>
        ))}

      <Formik
        initialValues={
          {
            confirmAccountToken,
          } as ConfirmAccountRequestValues
        }
        validationSchema={ConfirmAccountSchema}
        onSubmit={async (values: ConfirmAccountRequestValues) => {
          const response = await request('confirm-account', {
            confirmAccountToken: values.confirmAccountToken,
          } as ConfirmAccountRequestValues)

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
          <FormWrapper id="confirmAccountForm" method="POST" action={API_URL}>
            <Field
              id="confirmAccountToken"
              name="confirmAccountToken"
              data-testid="confirm-account-token-input"
              type="hidden"
              value={confirmAccountToken}
            />
            {errors.confirmAccountToken && touched.confirmAccountToken ? (
              <FormValidationMessage>
                {errors.confirmAccountToken}
              </FormValidationMessage>
            ) : null}
            <FormRow>
              <FormColumn alignItems="center">
                <FormButton type="submit" variant="outlined" size="medium">
                  Confirm Account
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

const FormWrapper = styled(Form)`
  padding: 0;
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

  align-items: ${(props) => props.alignItems};
  text-align: ${(props) => props.textAlign};

  @media (min-width: 834px) {
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

const FormValidationMessage = styled.div`
  color: #ff0000;
`

const FormButton = styled(Button)`
  font-size: 1rem;
  color: #333333;
  border-color: #333333;
  text-transform: none;
  width: 180px;
  margin-top: 16px;
`

export default ConfirmAccountForm
