import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import ResetPasswordForm from './ResetPasswordForm.tsx'
import { assertResetPasswordPageElements } from '../../helpers/AppHelper.tsx'
import * as AppUtil from '../../utils/AppUtil'

describe('Reset Password Form', () => {
  test.skip('Should render the <ResetPasswordForm />', () => {
    render(<ResetPasswordForm />)

    expect(screen.getByTestId('reset-password-form')).toBeInTheDocument()
  })

  test('Displays validation errors for empty required fields', async () => {
    render(<ResetPasswordForm />)

    const { resetPasswordButton } = assertResetPasswordPageElements()

    fireEvent.click(resetPasswordButton)

    expect(await screen.findByText('Required')).toBeInTheDocument()
    expect(
      await screen.findByText('Passwords do not match')
    ).toBeInTheDocument()
  })

  test('Displays error for invalid email format', async () => {
    render(<ResetPasswordForm />)

    const { usernameInput, resetPasswordButton } =
      assertResetPasswordPageElements()

    fireEvent.change(usernameInput, {
      target: { value: 'invalid-email' },
    })

    fireEvent.click(resetPasswordButton)

    expect(await screen.findByText('Invalid email')).toBeInTheDocument()
  })

  test('Displays error when passwords do not match', async () => {
    render(<ResetPasswordForm />)

    const { passwordInput, confirmPasswordInput, resetPasswordButton } =
      assertResetPasswordPageElements()

    fireEvent.change(passwordInput, {
      target: { value: 'password123' },
    })
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password456' },
    })
    fireEvent.click(resetPasswordButton)

    expect(
      await screen.findByText('Passwords do not match')
    ).toBeInTheDocument()
  })

  test('Submits form unsuccessfully with valid inputs', async () => {
    const spy = vi.spyOn(AppUtil, 'request').mockResolvedValueOnce({
      json: async () => ({ status: 400 }),
    } as Response)

    render(<ResetPasswordForm />)

    const {
      usernameInput,
      passwordInput,
      confirmPasswordInput,
      resetPasswordButton,
    } = assertResetPasswordPageElements()

    fireEvent.change(usernameInput, {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(passwordInput, {
      target: { value: 'password123' },
    })
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password123' },
    })

    fireEvent.click(resetPasswordButton)

    expect(
      await screen.findByText('Submitted unsuccessfully')
    ).toBeInTheDocument()

    spy.mockRestore()
  })

  test('Submits form successfully with valid inputs', async () => {
    const spy = vi.spyOn(AppUtil, 'request').mockResolvedValueOnce({
      json: async () => ({ status: 200 }),
    } as Response)

    render(<ResetPasswordForm />)

    const {
      usernameInput,
      passwordInput,
      confirmPasswordInput,
      resetPasswordButton,
    } = assertResetPasswordPageElements()

    fireEvent.change(usernameInput, {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(passwordInput, {
      target: { value: 'password123' },
    })
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password123' },
    })

    fireEvent.click(resetPasswordButton)

    expect(
      await screen.findByText('Submitted successfully')
    ).toBeInTheDocument()

    spy.mockRestore()
  })
})
