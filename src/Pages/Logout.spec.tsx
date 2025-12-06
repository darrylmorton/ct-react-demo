import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import Logout from './Logout'

describe.skip('Logout Page', () => {
  test('Should render the <Logout />', () => {
    render(<Logout />)

    expect(screen.getByTestId('logout-page')).toBeInTheDocument()
  })
})
