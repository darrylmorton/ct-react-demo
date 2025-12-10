import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import ForgotPassword from '../../Pages/ForgotPassword.tsx'
import { MemoryRouter } from 'react-router'

const meta = {
  title: 'ForgotPassword/Page',
  component: ForgotPassword,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ForgotPassword>

export default meta
type Story = StoryObj<typeof meta>

// More on component testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const ForgotPasswordPage: Story = {
  render: () => (
    <MemoryRouter>
      <ForgotPassword />
    </MemoryRouter>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const about = canvas.getByTestId('forgot-password-page')
    await expect(about).toBeInTheDocument()
  },
}
