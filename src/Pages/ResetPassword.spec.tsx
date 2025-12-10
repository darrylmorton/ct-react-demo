import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { MemoryRouter } from 'react-router'
import ResetPassword from './ResetPassword.tsx'

describe('Reset Password Page', () => {
  test('Should render the <ResetPassword />', () => {
    render(
      <MemoryRouter>
        <ResetPassword />
      </MemoryRouter>
    )

    expect(screen.getByTestId('reset-password-page')).toBeInTheDocument()
  })
})
