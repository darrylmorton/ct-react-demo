import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { MemoryRouter } from 'react-router'

import ResetPasswordForm from './ResetPasswordForm.tsx'
import {
  assertResetPasswordPageElements,
  resetPasswordToken,
} from '../../helpers/AppHelper.tsx'
import * as AppUtil from '../../utils/AppUtil'

describe('Reset Password Form', () => {
  test.skip('Should render the <ResetPasswordForm />', () => {
    render(
      <MemoryRouter
        initialEntries={[`/?resetPasswordToken=${resetPasswordToken}`]}
      >
        <ResetPasswordForm />
      </MemoryRouter>
    )

    expect(screen.getByTestId('reset-password-form')).toBeInTheDocument()
  })

  test('Displays validation errors for empty required fields', async () => {
    render(
      <MemoryRouter
        initialEntries={[`/?resetPasswordToken=${resetPasswordToken}`]}
      >
        <ResetPasswordForm />
      </MemoryRouter>
    )

    const { resetPasswordButton } = assertResetPasswordPageElements()

    fireEvent.click(resetPasswordButton)

    const requiredMessages = await screen.findAllByText('Required')
    expect(requiredMessages.length).toBeGreaterThanOrEqual(1)
    expect(
      await screen.findByText('Passwords do not match')
    ).toBeInTheDocument()
  })

  test('Displays error when passwords do not match', async () => {
    render(
      <MemoryRouter
        initialEntries={[`/?resetPasswordToken=${resetPasswordToken}`]}
      >
        <ResetPasswordForm />
      </MemoryRouter>
    )

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

    render(
      <MemoryRouter
        initialEntries={[`/?resetPasswordToken=${resetPasswordToken}`]}
      >
        <ResetPasswordForm />
      </MemoryRouter>
    )

    const { passwordInput, confirmPasswordInput, resetPasswordButton } =
      assertResetPasswordPageElements()

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

    render(
      <MemoryRouter
        initialEntries={[`/?resetPasswordToken=${resetPasswordToken}`]}
      >
        <ResetPasswordForm />
      </MemoryRouter>
    )

    const { passwordInput, confirmPasswordInput, resetPasswordButton } =
      assertResetPasswordPageElements()

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
