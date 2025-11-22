import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'
// import * as jest from '@jest/globals'

import SignupForm from './SignupForm.tsx'
import * as AppUtil from '../../util/AppUtil.ts'
import React from 'react'
import { type FormValues, request } from '../../util/AppUtil.ts'

describe('Signup Form', () => {
  test.skip('Should render the <SignupForm />', () => {
    render(<SignupForm />)

    expect(screen.getByText('Signup Form')).toBeInTheDocument()
  })

  test('Displays validation errors for empty required fields', async () => {
    render(<SignupForm />)

    fireEvent.click(screen.getByText('Signup'))

    expect(await screen.findAllByText('Required')).toHaveLength(3)
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument()
  })

  test('Displays error for invalid email format', async () => {
    render(<SignupForm />)

    fireEvent.change(screen.getByPlaceholderText('john@example.com'), {
      target: { value: 'invalid-email' },
    })
    fireEvent.click(screen.getByText('Signup'))

    await waitFor(() =>
      expect(screen.getByText('Invalid email')).toBeInTheDocument()
    )
  })

  test('Displays error when passwords do not match', async () => {
    render(<SignupForm />)

    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'password456' },
    })
    fireEvent.click(screen.getByText('Signup'))

    expect(
      await screen.findByText('Passwords do not match')
    ).toBeInTheDocument()
  })

  test('Submits form unsuccessfully with valid inputs', async () => {
    // use a spy on AppUtil.request and return a response-like object with json()
    const spy = vi.spyOn(AppUtil, 'request').mockResolvedValueOnce({
      json: async () => ({ status: 400 }),
    } as unknown as Response)

    render(<SignupForm />)

    fireEvent.change(screen.getByPlaceholderText('First Name'), {
      target: { value: 'John' },
    })
    fireEvent.change(screen.getByPlaceholderText('Last Name'), {
      target: { value: 'Doe' },
    })
    fireEvent.change(screen.getByPlaceholderText('john@example.com'), {
      target: { value: 'john.doe@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'password123' },
    })
    fireEvent.click(screen.getByText('Signup'))

    await waitFor(() =>
      expect(screen.getByText('Submitted unsuccessfully')).toBeInTheDocument()
    )

    spy.mockRestore()
  })

  test.skip('Submits form successfully with valid inputs', async () => {
    // @ts-expect-error ts-ignore
    vi.mock('../../util/AppUtil.ts', { spy: true })

    // await request({
    //   firstName: 'John',
    //   lastName: 'Doe',
    //   username: 'john@example.com',
    //   password: 'password123',
    // } as FormValues)

    // return Promise.resolve({
    //   json: () =>
    //     Promise.resolve({
    //       status: 200,
    //     }),
    // })
    // })

    render(<SignupForm />)

    fireEvent.change(screen.getByPlaceholderText('First Name'), {
      target: { value: 'John' },
    })
    fireEvent.change(screen.getByPlaceholderText('Last Name'), {
      target: { value: 'Doe' },
    })
    fireEvent.change(screen.getByPlaceholderText('john@example.com'), {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'password123' },
    })

    fireEvent.click(screen.getByText('Signup'))

    expect(request).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      username: 'john@example.com',
      password: 'password123',
    })

    // expect(
    //   await screen.findByText('Submitted successfully')
    // ).toBeInTheDocument()
  })
})
