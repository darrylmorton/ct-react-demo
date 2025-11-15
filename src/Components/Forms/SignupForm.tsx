import styled from '@emotion/styled'
// import 'react-app-polyfill/ie11';
import { Formik, Field, Form, type FormikHelpers } from 'formik'

interface Values {
  firstName: string
  lastName: string
  email: string
}

const SignupForm = () => {
  return (
    <div>
      <Title>Signup Form</Title>
      {/* TODO update */}
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 500)
        }}
      >
        <FormWrapper>
          <FormRow>
            <FormColumn textAlign="left">
              <label htmlFor="firstName">*First Name:</label>
              <FormField
                id="firstName"
                name="firstName"
                placeholder="First Name"
              />
            </FormColumn>
            <FormColumn textAlign="left">
              <label htmlFor="lastName">*Last Name:</label>
              <FormField
                id="lastName"
                name="lastName"
                placeholder="Last Name"
              />
            </FormColumn>
          </FormRow>
          <FormRow>
            <FormColumn textAlign="left">
              <label htmlFor="username">*Email:</label>
              <FormField
                id="username"
                name="username"
                placeholder="john@example.com"
                type="email"
                width="100%"
              />
            </FormColumn>
          </FormRow>
          <FormRow>
            <FormColumn textAlign="left">
              <label htmlFor="password">*Password:</label>
              <FormField id="password" name="password" placeholder="Password" />
            </FormColumn>
            <FormColumn textAlign="left">
              <label htmlFor="confirmPassword">*Confirm Password:</label>
              <FormField
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
              />
            </FormColumn>
          </FormRow>
          <FormRow>
            <FormColumn alignItems="center">
              <Button type="button">Reset</Button>
            </FormColumn>
            <FormColumn alignItems="center">
              <Button type="submit">Signup</Button>
            </FormColumn>
          </FormRow>
        </FormWrapper>
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
  width: 100%;

  place-items: center;
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

const FormField = styled(Field)`
  width: 100%;
  height: 24px;
  font-size: 1rem;
`

const Button = styled.button`
  width: 140px;
  margin-top: 16px;
  padding: 4px;
  font-size: 1rem;
`

export default SignupForm
