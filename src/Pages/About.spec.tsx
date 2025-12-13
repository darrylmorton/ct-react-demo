import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import About from './About'

describe('About Page', () => {
  test('Should render the <About />', () => {
    render(<About />)

    expect(screen.getByTestId('about-page')).toBeInTheDocument()
  })
})
