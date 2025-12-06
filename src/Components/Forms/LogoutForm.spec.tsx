import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import LogoutForm from './LogoutForm'
import * as AppUtil from '../../utils/AppUtil'
import { authToken } from '../../helpers/AppHelper'

describe('Logout Form', () => {
  test.skip('Should render the <LogoutForm />', () => {
    render(<LogoutForm />)

    expect(screen.getByTestId('logout-form')).toBeInTheDocument()
  })

  test('Submits form successfully with logged out user', async () => {
    const localStorageRemoveItemSpy = vi.spyOn(Storage.prototype, 'removeItem')

    render(<LogoutForm />)

    fireEvent.click(screen.getByText('Logout'))

    expect(await screen.findByText('User is not logged in')).toBeInTheDocument()

    await waitFor(() =>
      expect(localStorageRemoveItemSpy).toHaveBeenCalledWith('authToken')
    )

    localStorageRemoveItemSpy.mockRestore()
  })

  test('Submits form unsuccessfully with valid form and bad response', async () => {
    const logoutRequestSpy = vi
      .spyOn(AppUtil, 'request')
      .mockResolvedValueOnce({
        json: async () => ({
          status: 400,
        }),
      } as Response)

    localStorage.setItem('authToken', authToken)

    const localStorageRemoveItemSpy = vi.spyOn(Storage.prototype, 'removeItem')

    render(<LogoutForm />)

    fireEvent.click(screen.getByText('Logout'))

    expect(
      await screen.findByText('Submitted unsuccessfully')
    ).toBeInTheDocument()

    await waitFor(() =>
      expect(localStorageRemoveItemSpy).toHaveBeenCalledWith('authToken')
    )

    logoutRequestSpy.mockRestore()
    localStorageRemoveItemSpy.mockRestore()
  })

  test('Submits form successfully with valid form', async () => {
    const logoutRequestSpy = vi
      .spyOn(AppUtil, 'request')
      .mockResolvedValueOnce({
        json: async () => ({
          status: 200,
        }),
      } as Response)

    localStorage.setItem('authToken', authToken)

    const localStorageRemoveItemSpy = vi.spyOn(Storage.prototype, 'removeItem')

    render(<LogoutForm />)

    fireEvent.click(screen.getByText('Logout'))

    expect(
      await screen.findByText('Submitted successfully')
    ).toBeInTheDocument()

    await waitFor(() =>
      expect(localStorageRemoveItemSpy).toHaveBeenCalledWith('authToken')
    )

    logoutRequestSpy.mockRestore()
    localStorageRemoveItemSpy.mockRestore()
  })
})
