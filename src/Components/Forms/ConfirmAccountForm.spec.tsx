import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import ConfirmAccountForm from './ConfirmAccountForm.tsx'
import {
  assertConfirmAccountPageElements,
  confirmAccountToken,
} from '../../helpers/AppHelper.tsx'
import * as AppUtil from '../../utils/AppUtil'
import { BrowserRouter } from 'react-router'

describe('Confirm Account Form', () => {
  test.skip('Should render the <ConfirmAccountForm />', () => {
    render(
      <BrowserRouter>
        <ConfirmAccountForm />
      </BrowserRouter>
    )

    expect(screen.getByTestId('confirm-account-form')).toBeInTheDocument()
  })

  test('Displays validation errors for empty required fields', async () => {
    render(
      <BrowserRouter>
        <ConfirmAccountForm />
      </BrowserRouter>
    )

    const { confirmAccountButton } = assertConfirmAccountPageElements()

    fireEvent.click(confirmAccountButton)

    expect(
      await screen.findByText('Confirm Account Token is Required')
    ).toBeInTheDocument()
  })

  test.skip('Displays error for invalid jwt format', async () => {
    render(
      <BrowserRouter>
        <ConfirmAccountForm />
      </BrowserRouter>
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
      <BrowserRouter>
        <ConfirmAccountForm />
      </BrowserRouter>
    )

    const { confirmAccountTokenInput, confirmAccountButton } =
      assertConfirmAccountPageElements()

    fireEvent.change(confirmAccountTokenInput, {
      target: { value: 'abc' },
    })

    fireEvent.click(confirmAccountButton)

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
      <BrowserRouter>
        <ConfirmAccountForm />
      </BrowserRouter>
    )

    const { confirmAccountTokenInput, confirmAccountButton } =
      assertConfirmAccountPageElements()

    fireEvent.change(confirmAccountTokenInput, {
      target: { value: confirmAccountToken },
    })

    fireEvent.click(confirmAccountButton)

    expect(
      await screen.findByText('Submitted successfully')
    ).toBeInTheDocument()

    spy.mockRestore()
  })
})
