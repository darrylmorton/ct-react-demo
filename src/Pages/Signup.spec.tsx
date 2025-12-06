import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import Signup from './Signup'

describe.skip('Signup Page', () => {
  test('Should render the <Signup />', () => {
    render(<Signup />)

    expect(screen.getByTestId('signup-form')).toBeInTheDocument()
  })
})
