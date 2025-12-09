import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import ForgotPasswordForm from './ForgotPasswordForm.tsx'
import { assertForgotPasswordPageElements } from '../../helpers/AppHelper.tsx'
import * as AppUtil from '../../utils/AppUtil'

describe('Forgot Password Form', () => {
  test.skip('Should render the <ForgotPasswordForm />', () => {
    render(<ForgotPasswordForm />)

    expect(screen.getByTestId('reset-password-form')).toBeInTheDocument()
  })

  test('Displays validation errors for empty required fields', async () => {
    render(<ForgotPasswordForm />)

    const { submitButton } = assertForgotPasswordPageElements()

    fireEvent.click(submitButton)

    expect(await screen.findByText('Required')).toBeInTheDocument()
  })

  test('Displays error for invalid email format', async () => {
    render(<ForgotPasswordForm />)

    const { usernameInput, submitButton } = assertForgotPasswordPageElements()

    fireEvent.change(usernameInput, {
      target: { value: 'invalid-email' },
    })

    fireEvent.click(submitButton)

    expect(await screen.findByText('Invalid email')).toBeInTheDocument()
  })

  test('Submits form unsuccessfully with valid inputs', async () => {
    const spy = vi.spyOn(AppUtil, 'request').mockResolvedValueOnce({
      json: async () => ({ status: 400 }),
    } as Response)

    render(<ForgotPasswordForm />)

    const { usernameInput, submitButton } = assertForgotPasswordPageElements()

    fireEvent.change(usernameInput, {
      target: { value: 'john@example.com' },
    })

    fireEvent.click(submitButton)

    expect(
      await screen.findByText('Submitted unsuccessfully')
    ).toBeInTheDocument()

    spy.mockRestore()
  })

  test('Submits form successfully with valid inputs', async () => {
    const spy = vi.spyOn(AppUtil, 'request').mockResolvedValueOnce({
      json: async () => ({ status: 200 }),
    } as Response)

    render(<ForgotPasswordForm />)

    const { usernameInput, submitButton } = assertForgotPasswordPageElements()

    fireEvent.change(usernameInput, {
      target: { value: 'john@example.com' },
    })

    fireEvent.click(submitButton)

    expect(
      await screen.findByText('Submitted successfully')
    ).toBeInTheDocument()

    spy.mockRestore()
  })
})
