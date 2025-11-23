import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import LoginForm from './LoginForm'
import * as AppUtil from '../../util/AppUtil'

describe('Login Form', () => {
  test.skip('Should render the <LoginForm />', () => {
    render(<LoginForm />)

    expect(screen.getByText('Login Form')).toBeInTheDocument()
  })

  test('Displays validation errors for empty required fields', async () => {
    render(<LoginForm />)

    fireEvent.click(screen.getByText('Login'))

    expect(await screen.findAllByText('Required')).toHaveLength(2)
  })

  test('Displays error for invalid fields', async () => {
    render(<LoginForm />)

    fireEvent.change(screen.getByPlaceholderText('john@example.com'), {
      target: { value: 'invalid-email' },
    })

    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'p' },
    })

    fireEvent.click(screen.getByText('Login'))

    expect(await screen.findAllByText('Required')).toHaveLength(2)
  })

  test('Submits form unsuccessfully with valid inputs', async () => {
    const spy = vi.spyOn(AppUtil, 'request').mockResolvedValueOnce({
      json: async () => ({ status: 400 }),
    } as Response)

    render(<LoginForm />)

    fireEvent.change(screen.getByPlaceholderText('john@example.com'), {
      target: { value: 'john.doe@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    })

    fireEvent.click(screen.getByText('Login'))

    expect(
      await screen.findByText('Submitted unsuccessfully')
    ).toBeInTheDocument()

    spy.mockRestore()
  })

  test('Submits form unsuccessfully with invalid token response', async () => {
    const spy = vi.spyOn(AppUtil, 'request').mockResolvedValueOnce({
      json: async () => ({
        status: 200,
      }),
    } as Response)

    render(<LoginForm />)

    fireEvent.change(screen.getByPlaceholderText('john@example.com'), {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    })

    fireEvent.click(screen.getByText('Login'))

    expect(
      await screen.findByText('There was a problem submitting the form')
    ).toBeInTheDocument()

    spy.mockRestore()
  })

  test('Submits form successfully with valid inputs', async () => {
    const appUtilSpy = vi.spyOn(AppUtil, 'request').mockResolvedValueOnce({
      json: async () => ({
        status: 200,
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      }),
    } as Response)

    const localStorageSpy = vi.spyOn(Storage.prototype, 'setItem')

    render(<LoginForm />)

    fireEvent.change(screen.getByPlaceholderText('john@example.com'), {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    })

    fireEvent.click(screen.getByText('Login'))

    expect(
      await screen.findByText('Submitted successfully')
    ).toBeInTheDocument()

    appUtilSpy.mockRestore()

    expect(localStorageSpy).toHaveBeenCalledWith(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    )

    localStorageSpy.mockRestore()
  })
})
