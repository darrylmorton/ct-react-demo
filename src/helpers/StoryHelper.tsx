import { expect, within } from 'storybook/test'

export const assertStoryLoginPageElements = async (
  canvasElement: HTMLElement
) => {
  const canvas = within(canvasElement)

  const usernameInput = canvas.getByPlaceholderText('john@example.com')
  await expect(usernameInput).toBeInTheDocument()

  const passwordInput = canvas.getByPlaceholderText('Password')
  await expect(passwordInput).toBeInTheDocument()

  const loginButton = canvas.getByText('Login')
  await expect(loginButton).toBeInTheDocument()

  return { usernameInput, passwordInput, loginButton }
}

export const assertStorySignupPageElements = async (
  canvasElement: HTMLElement
) => {
  const canvas = within(canvasElement)

  const resetButton = canvas.getByText('Reset')
  await expect(resetButton).toBeInTheDocument()

  const signupButton = canvas.getByText('Signup')
  await expect(signupButton).toBeInTheDocument()

  const firstNameInput = canvas.getByPlaceholderText('First Name')
  await expect(firstNameInput).toBeInTheDocument()

  const lastNameInput = canvas.getByPlaceholderText('Last Name')
  await expect(lastNameInput).toBeInTheDocument()

  const usernameInput = canvas.getByPlaceholderText('john@example.com')
  await expect(usernameInput).toBeInTheDocument()

  const passwordInput = canvas.getByPlaceholderText('Password')
  await expect(passwordInput).toBeInTheDocument()

  const confirmPasswordInput = canvas.getByPlaceholderText('Confirm Password')
  await expect(confirmPasswordInput).toBeInTheDocument()

  return {
    firstNameInput,
    lastNameInput,
    usernameInput,
    passwordInput,
    confirmPasswordInput,
    resetButton,
    signupButton,
  }
}

export const assertStoryResetPasswordPageElements = async (
  canvasElement: HTMLElement
) => {
  const canvas = within(canvasElement)

  const resetPasswordButton = canvas.getByText('Reset Password')
  await expect(resetPasswordButton).toBeInTheDocument()

  const passwordInput = canvas.getByPlaceholderText('Password')
  await expect(passwordInput).toBeInTheDocument()

  const confirmPasswordInput = canvas.getByPlaceholderText('Confirm Password')
  await expect(confirmPasswordInput).toBeInTheDocument()

  return {
    passwordInput,
    confirmPasswordInput,
    resetPasswordButton,
  }
}

export const assertStoryLogoutPageElements = async (
  canvasElement: HTMLElement
) => {
  const canvas = within(canvasElement)

  const logoutButton = canvas.getByText('Logout')
  await expect(logoutButton).toBeInTheDocument()

  return { logoutButton }
}

export const assertStoryForgotPasswordPageElements = async (
  canvasElement: HTMLElement
) => {
  const canvas = within(canvasElement)

  const forgotPasswordButton = canvas.getByText('Forgot Password')
  await expect(forgotPasswordButton).toBeInTheDocument()

  const usernameInput = canvas.getByPlaceholderText('john@example.com')
  await expect(usernameInput).toBeInTheDocument()

  return {
    usernameInput,
    forgotPasswordButton,
  }
}

export const assertStoryConfirmAccountPageElements = async (
  canvasElement: HTMLElement
) => {
  const canvas = within(canvasElement)

  const confirmAccountButton = canvas.getByText('Confirm Account')
  await expect(confirmAccountButton).toBeInTheDocument()

  return {
    confirmAccountButton,
  }
}
