import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import LoginForm from './LoginForm'
import * as AppUtil from '../../utils/AppUtil'
import { assertLoginPageElements, authToken } from '../../helpers/AppHelper.tsx'

describe('Login Form', () => {
  test.skip('Should render the <LoginForm />', () => {
    render(<LoginForm />)

    expect(screen.getByTestId('login-form')).toBeInTheDocument()
  })

  test('Displays validation errors for empty required fields', async () => {
    render(<LoginForm />)

    const { loginButton } = assertLoginPageElements()

    fireEvent.click(loginButton)

    expect(await screen.findAllByText('Required')).toHaveLength(2)
  })

  test('Displays error for invalid fields', async () => {
    render(<LoginForm />)

    const { usernameInput, passwordInput, loginButton } =
      assertLoginPageElements()

    fireEvent.change(usernameInput, {
      target: { value: 'invalid-email' },
    })

    fireEvent.change(passwordInput, {
      target: { value: 'p' },
    })

    fireEvent.click(loginButton)

    expect(await screen.findAllByText('Required')).toHaveLength(2)
  })

  test('Submits form unsuccessfully with valid inputs', async () => {
    const spy = vi.spyOn(AppUtil, 'request').mockResolvedValueOnce({
      json: async () => ({ status: 400 }),
    } as Response)

    render(<LoginForm />)

    const { usernameInput, passwordInput, loginButton } =
      assertLoginPageElements()

    fireEvent.change(usernameInput, {
      target: { value: 'john.doe@example.com' },
    })
    fireEvent.change(passwordInput, {
      target: { value: 'password123' },
    })

    fireEvent.click(loginButton)

    expect(
      await screen.findByText('Submitted unsuccessfully')
    ).toBeInTheDocument()

    spy.mockRestore()
  })

  test('Submits form unsuccessfully with invalid authToken response', async () => {
    const spy = vi.spyOn(AppUtil, 'request').mockResolvedValueOnce({
      json: async () => ({
        status: 200,
      }),
    } as Response)

    render(<LoginForm />)

    const { usernameInput, passwordInput, loginButton } =
      assertLoginPageElements()

    fireEvent.change(usernameInput, {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(passwordInput, {
      target: { value: 'password123' },
    })

    fireEvent.click(loginButton)

    expect(
      await screen.findByText('There was a problem submitting the form')
    ).toBeInTheDocument()

    spy.mockRestore()
  })

  test('Submits form successfully with valid inputs', async () => {
    const appUtilSpy = vi.spyOn(AppUtil, 'request').mockResolvedValueOnce({
      json: async () => ({
        status: 200,
        authToken,
      }),
    } as Response)

    const localStorageSpy = vi.spyOn(Storage.prototype, 'setItem')

    render(<LoginForm />)

    const { usernameInput, passwordInput, loginButton } =
      assertLoginPageElements()

    fireEvent.change(usernameInput, {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(passwordInput, {
      target: { value: 'password123' },
    })

    fireEvent.click(loginButton)

    expect(
      await screen.findByText('Submitted successfully')
    ).toBeInTheDocument()

    appUtilSpy.mockRestore()

    expect(localStorageSpy).toHaveBeenCalledWith('authToken', authToken)

    localStorageSpy.mockRestore()
  })
})
