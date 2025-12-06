import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import Profile from './Profile'

describe('Profile Page', () => {
  test('Should render the <Login />', () => {
    render(<Profile />)

    expect(screen.getByTestId('profile-page')).toBeInTheDocument()
  })
})
