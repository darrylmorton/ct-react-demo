import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import SignupForm from './SignupForm'
import * as AppUtil from '../../utils/AppUtil'
import { assertSignupPageElements } from '../../helpers/AppHelper.tsx'

describe('Signup Form', () => {
  test.skip('Should render the <SignupForm />', () => {
    render(<SignupForm />)

    expect(screen.getByText('Signup Form')).toBeInTheDocument()
  })

  test('Displays validation errors for empty required fields', async () => {
    render(<SignupForm />)

    const { signupButton } = assertSignupPageElements()

    fireEvent.click(signupButton)

    expect(await screen.findAllByText('Required')).toHaveLength(4)
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument()
  })

  test('Displays error for invalid email format', async () => {
    render(<SignupForm />)

    const { usernameInput, signupButton } = assertSignupPageElements()

    fireEvent.change(usernameInput, {
      target: { value: 'invalid-email' },
    })

    fireEvent.click(signupButton)

    expect(await screen.findByText('Invalid email')).toBeInTheDocument()
  })

  test('Displays error when passwords do not match', async () => {
    render(<SignupForm />)

    const { passwordInput, confirmPasswordInput, signupButton } =
      assertSignupPageElements()

    fireEvent.change(passwordInput, {
      target: { value: 'password123' },
    })
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password456' },
    })
    fireEvent.click(signupButton)

    expect(
      await screen.findByText('Passwords do not match')
    ).toBeInTheDocument()
  })

  test('Submits form unsuccessfully with valid inputs', async () => {
    const spy = vi.spyOn(AppUtil, 'request').mockResolvedValueOnce({
      json: async () => ({ status: 400 }),
    } as Response)

    render(<SignupForm />)

    const {
      firstNameInput,
      lastNameInput,
      usernameInput,
      passwordInput,
      confirmPasswordInput,
      signupButton,
    } = assertSignupPageElements()

    fireEvent.change(firstNameInput, {
      target: { value: 'John' },
    })
    fireEvent.change(lastNameInput, {
      target: { value: 'Doe' },
    })
    fireEvent.change(usernameInput, {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(passwordInput, {
      target: { value: 'password123' },
    })
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password123' },
    })

    fireEvent.click(signupButton)

    expect(
      await screen.findByText('Submitted unsuccessfully')
    ).toBeInTheDocument()

    spy.mockRestore()
  })

  test('Submits form successfully with valid inputs', async () => {
    const spy = vi.spyOn(AppUtil, 'request').mockResolvedValueOnce({
      json: async () => ({ status: 200 }),
    } as Response)

    render(<SignupForm />)

    const {
      firstNameInput,
      lastNameInput,
      usernameInput,
      passwordInput,
      confirmPasswordInput,
      signupButton,
    } = assertSignupPageElements()

    fireEvent.change(firstNameInput, {
      target: { value: 'John' },
    })
    fireEvent.change(lastNameInput, {
      target: { value: 'Doe' },
    })
    fireEvent.change(usernameInput, {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(passwordInput, {
      target: { value: 'password123' },
    })
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password123' },
    })

    fireEvent.click(signupButton)

    expect(
      await screen.findByText('Submitted successfully')
    ).toBeInTheDocument()

    spy.mockRestore()
  })
})
