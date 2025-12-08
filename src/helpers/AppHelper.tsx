import { screen } from '@testing-library/react'

export const authToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
export const confirmAccountToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw6d'

export const assertLoginPageElements = () => {
  return {
    usernameInput: screen.getByPlaceholderText('john@example.com'),
    passwordInput: screen.getByPlaceholderText('Password'),
    loginButton: screen.getByText('Login'),
  }
}

export const assertSignupPageElements = () => {
  return {
    firstNameInput: screen.getByPlaceholderText('First Name'),
    lastNameInput: screen.getByPlaceholderText('Last Name'),
    usernameInput: screen.getByPlaceholderText('john@example.com'),
    passwordInput: screen.getByPlaceholderText('Password'),
    confirmPasswordInput: screen.getByPlaceholderText('Confirm Password'),
    resetButton: screen.getByText('Reset'),
    signupButton: screen.getByText('Signup'),
  }
}

export const assertLogoutPageElements = async () => {
  return { logoutButton: screen.getByTestId('logout-page') }
}
