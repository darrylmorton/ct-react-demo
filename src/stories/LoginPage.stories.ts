import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import Login from '../Pages/Login'

const meta = {
  title: 'Login/Page',
  component: Login,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Login>

export default meta
type Story = StoryObj<typeof meta>

// More on component testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const LoginPage: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const login = canvas.getByText('Login')
    await expect(login).toBeInTheDocument()
  },
}
