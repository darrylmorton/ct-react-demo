import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import ConfirmAccount from './ConfirmAccount.tsx'
import { MemoryRouter } from 'react-router'

describe('Confirm Account Page', () => {
  test('Should render the <ConfirmAccount />', () => {
    render(
      <MemoryRouter>
        <ConfirmAccount />
      </MemoryRouter>
    )

    expect(screen.getByTestId('confirm-account-page')).toBeInTheDocument()
  })
})
