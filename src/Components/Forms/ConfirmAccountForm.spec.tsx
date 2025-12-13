import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import ConfirmAccountForm from './ConfirmAccountForm.tsx'
import {
  assertConfirmAccountPageElements,
  confirmAccountToken,
} from '../../helpers/AppHelper.tsx'
import * as AppUtil from '../../utils/AppUtil'
import { MemoryRouter } from 'react-router'

describe('Confirm Account Form', () => {
  test.skip('Should render the <ConfirmAccountForm />', () => {
    render(
      <MemoryRouter>
        <ConfirmAccountForm />
      </MemoryRouter>
    )

    expect(screen.getByTestId('confirm-account-form')).toBeInTheDocument()
  })

  test('Displays validation errors for empty required fields', async () => {
    render(
      <MemoryRouter>
        <ConfirmAccountForm />
      </MemoryRouter>
    )

    const { confirmAccountButton } = assertConfirmAccountPageElements()

    fireEvent.click(confirmAccountButton)

    expect(
      await screen.findByText('Account confirmation token is missing')
    ).toBeInTheDocument()
  })

  test.skip('Displays error for invalid jwt format', async () => {
    render(
      <MemoryRouter>
        <ConfirmAccountForm />
      </MemoryRouter>
    )

    const { confirmAccountTokenInput, confirmAccountButton } =
      assertConfirmAccountPageElements()

    fireEvent.change(confirmAccountTokenInput, {
      target: { value: 'invalid-jwt' },
    })

    fireEvent.click(confirmAccountButton)

    expect(await screen.findByText('Invalid email')).toBeInTheDocument()
  })

  test('Submits form unsuccessfully with valid inputs', async () => {
    const spy = vi.spyOn(AppUtil, 'request').mockResolvedValueOnce({
      json: async () => ({ status: 400 }),
    } as Response)

    render(
      <MemoryRouter
        initialEntries={[`/?confirmAccountToken=${confirmAccountToken}`]}
      >
        <ConfirmAccountForm />
      </MemoryRouter>
    )

    const { confirmAccountButton } = assertConfirmAccountPageElements()

    fireEvent.click(confirmAccountButton)

    expect(
      await screen.findByText('Submitted unsuccessfully')
    ).toBeInTheDocument()

    spy.mockRestore()
  })

  test('Submits form successfully with valid inputs', async () => {
    const spy = vi.spyOn(AppUtil, 'request').mockResolvedValueOnce({
      json: async () => ({ status: 200, authToken: 'fake-token' }),
    } as Response)

    render(
      <MemoryRouter
        initialEntries={[`/?confirmAccountToken=${confirmAccountToken}`]}
      >
        <ConfirmAccountForm />
      </MemoryRouter>
    )

    const { confirmAccountButton } = assertConfirmAccountPageElements()

    fireEvent.click(confirmAccountButton)

    expect(
      await screen.findByText('Submitted successfully')
    ).toBeInTheDocument()

    spy.mockRestore()
  })
})
