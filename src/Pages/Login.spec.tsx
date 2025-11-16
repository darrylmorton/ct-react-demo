import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import Login from './Login'

describe('Login Page', () => {
  test('Should render the <Login />', () => {
    render(<Login />)

    expect(screen.getByText('Login')).toBeTruthy()
  })
})
