import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import Signup from './Signup'

describe('Signup Page', () => {
  test('Should render the <Signup />', () => {
    render(<Signup />)

    expect(screen.getByText('Signup Form')).toBeInTheDocument()
  })
})
