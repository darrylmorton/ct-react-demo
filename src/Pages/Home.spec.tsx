import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import Home from './Home'

describe('Home Page', () => {
  test('Should render the <Home />', () => {
    render(<Home />)

    expect(screen.getByText('Home')).toBeInTheDocument()
  })
})
