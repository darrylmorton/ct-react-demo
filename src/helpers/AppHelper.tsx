import { vi, expect } from 'vitest'

import * as AppUtil from '../utils/AppUtil'
import { render, fireEvent, screen } from '@testing-library/react'
import LoginForm from '../Components/Forms/LoginForm.tsx'

export const authToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

export const postLoginRequestSpy = async () => {
  return vi.spyOn(AppUtil, 'request').mockResolvedValueOnce({
    json: async () => ({
      status: 200,
      authToken,
    }),
  } as Response)
}

export const getLocalStorageSetItemSpy = () => {
  return vi.spyOn(Storage.prototype, 'setItem')
}

export const getLocalStorageGetItemSpy = () => {
  return vi.spyOn(Storage.prototype, 'getItem')
}

export const loginFormMock = async () => {
  const loginRequestSpy = await postLoginRequestSpy()
  const localStorageGetItemSpy = getLocalStorageGetItemSpy()
  const localStorageSetItemSpy = getLocalStorageSetItemSpy()

  // render(<LoginForm />)
  //
  // fireEvent.change(screen.getByPlaceholderText('john@example.com'), {
  //   target: { value: 'john@example.com' },
  // })
  // fireEvent.change(screen.getByPlaceholderText('Password'), {
  //   target: { value: 'password123' },
  // })
  //
  // fireEvent.click(screen.getByText('Login'))

  // expect(await screen.findByText('Submitted successfully')).toBeInTheDocument()

  // requestMock.mockRestore()

  // expect(localStorageGetItemSpy).toHaveBeenCalledWith('authToken')

  // localStorageGetItemMock.mockRestore()

  return { loginRequestSpy, localStorageGetItemSpy, localStorageSetItemSpy }
}
