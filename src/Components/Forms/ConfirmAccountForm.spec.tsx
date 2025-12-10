import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import ConfirmAccountForm from './ConfirmAccountForm.tsx'
import { assertConfirmAccountPageElements } from '../../helpers/AppHelper.tsx'
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
      await screen.findByText('Confirm Account Token is Required')
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

    // Provide a valid-length token via router initialEntries so Formik validation passes
    const invalidButLongToken = 'abcdefgh' // 8 chars meets min length

    render(
      <MemoryRouter
        initialEntries={[`/?confirmAccountToken=${invalidButLongToken}`]}
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

    // Use a token of valid length (8 chars) so validation passes
    const validToken = 'abcd1234'

    render(
      <MemoryRouter initialEntries={[`/?confirmAccountToken=${validToken}`]}>
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
