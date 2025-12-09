import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import ConfirmAccount from '../../Pages/ConfirmAccount.tsx'
import { BrowserRouter } from 'react-router'

const meta = {
  title: 'ConfirmAccount/Page',
  component: ConfirmAccount,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ConfirmAccount>

export default meta
type Story = StoryObj<typeof meta>

// More on component testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const ConfirmAccountPage: Story = {
  render: () => (
    <BrowserRouter>
      <ConfirmAccount />
    </BrowserRouter>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const about = canvas.getByTestId('confirm-account-page')
    await expect(about).toBeInTheDocument()
  },
}
