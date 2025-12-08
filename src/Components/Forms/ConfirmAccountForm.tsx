import styled from '@emotion/styled'
import { Formik, Form, Field } from 'formik'
import { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { Button } from '@mui/material'
import { useSearchParams } from 'react-router'

import {
  request,
  API_URL,
  type ConfirmAccountRequestValues,
} from '../../utils/AppUtil'

const ConfirmAccountSchema = Yup.object({
  confirmAccountToken: Yup.string()
    .min(8, 'Required')
    .max(16, 'Required')
    .required('Confirm Account Token is Required'),
})

const ConfirmAccountForm = () => {
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [searchParams] = useSearchParams()
  const confirmAccountToken = searchParams.get('confirm-account-token') || ''

  useEffect(() => {
    if (!confirmAccountToken) {
      setErrorMessage('Account confirmation token is missing')
    }
  }, [confirmAccountToken])

  return (
    <Wrapper data-testid="confirm-account-form">
      {successMessage && (
        <FormSuccessMessage>{successMessage}</FormSuccessMessage>
      )}
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}

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
            } else if (responseJson.status === 200 && responseJson.authToken) {
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
          <FormWrapper id="confirmAccountForm" method="POST" action={API_URL}>
            <Field
              id="confirmAccountToken"
              name="confirmAccountToken"
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

const FormValidationMessage = styled.div`
  color: #ff0000;
`

const FormButton = styled(Button)`
  margin-top: 16px;
  font-size: 1rem;
  color: #333333;
  border-color: #333333;

  @media (min-width: 320px) {
    width: 70%;
  }

  @media (min-width: 834px) {
    width: 50%;
  }
`

export default ConfirmAccountForm
