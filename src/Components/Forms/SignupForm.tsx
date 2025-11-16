import styled from '@emotion/styled'
// import 'react-app-polyfill/ie11';
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'

interface Values {
  firstName: string
  lastName: string
  username: string
  password: string
  confirmPassword: string
}

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
  username: Yup.string().email('Invalid email').required('Required'),
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
  return (
    <div>
      <Title>Signup Form</Title>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          username: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values: Values, actions) => {
          actions.setSubmitting(false)

          console.log(values)
        }}
      >
        {({ errors, touched }) => (
          <FormWrapper>
            <FormRow>
              <FormColumn textAlign="left">
                <label htmlFor="firstName">First Name*:</label>
                <FormField
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                />
                {errors.firstName && touched.firstName ? (
                  <FormFieldError>{errors.firstName}</FormFieldError>
                ) : null}
              </FormColumn>
              <FormColumn textAlign="left">
                <label htmlFor="lastName">Last Name*:</label>
                <FormField
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                />
                {errors.lastName && touched.lastName ? (
                  <FormFieldError>{errors.lastName}</FormFieldError>
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
                  type="email"
                />
                {errors.username && touched.username ? (
                  <FormFieldError>{errors.username}</FormFieldError>
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
                />
                {errors.password && touched.password ? (
                  <FormFieldError>{errors.password}</FormFieldError>
                ) : null}
              </FormColumn>
              <FormColumn textAlign="left">
                <label htmlFor="confirmPassword">Confirm Password*:</label>
                <FormField
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <FormFieldError>{errors.confirmPassword}</FormFieldError>
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

const FormField = styled(Field)`
  width: 100%;
  height: 24px;
  font-size: 1rem;
`

const FormFieldError = styled.div`
  color: #ff0000;
`

const Button = styled.button`
  width: 140px;
  margin-top: 16px;
  padding: 4px;
  font-size: 1rem;
`

export default SignupForm
