import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import ForgotPassword from './ForgotPassword.tsx'

describe('Forgot Password Page', () => {
  test('Should render the <ForgotPassword />', () => {
    render(<ForgotPassword />)

    expect(screen.getByTestId('forgot-password-page')).toBeInTheDocument()
  })
})
