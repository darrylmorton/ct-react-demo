import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import ResetPassword from '../../Pages/ResetPassword.tsx'
import { MemoryRouter } from 'react-router'

const meta = {
  title: 'ResetPassword/Page',
  component: ResetPassword,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ResetPassword>

export default meta
type Story = StoryObj<typeof meta>

// More on component testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const ResetPasswordPage: Story = {
  render: () => (
    <MemoryRouter>
      <ResetPassword />
    </MemoryRouter>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const about = canvas.getByTestId('reset-password-page')
    await expect(about).toBeInTheDocument()
  },
}
