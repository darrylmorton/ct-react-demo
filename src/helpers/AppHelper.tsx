import { screen } from '@testing-library/react'

export const authToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
export const confirmAccountToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw6d'
export const resetPasswordToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw7e'

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

export const assertForgotPasswordPageElements = () => {
  return {
    // ForgotPasswordForm renders an input with placeholder 'Email'
    usernameInput: screen.getByPlaceholderText('john@example.com'),
    submitButton: screen.getByText('Forgot Password'),
  }
}

export const assertConfirmAccountPageElements = () => {
  return {
    confirmAccountTokenInput: screen.getByTestId('confirm-account-token-input'),
    confirmAccountButton: screen.getByText('Confirm Account'),
  }
}

export const assertResetPasswordPageElements = () => {
  return {
    resetPasswordToken: screen.getByTestId('reset-password-token-input'),
    passwordInput: screen.getByPlaceholderText('Password'),
    confirmPasswordInput: screen.getByPlaceholderText('Confirm Password'),
    resetPasswordButton: screen.getByText('Reset Password'),
  }
}

export const assertLogoutPageElements = async () => {
  return { logoutButton: screen.getByTestId('logout-page') }
}
