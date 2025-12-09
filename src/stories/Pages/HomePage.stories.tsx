import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import Home from '../../Pages/Home.tsx'

const meta = {
  title: 'Home/Page',
  component: Home,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Home>

export default meta
type Story = StoryObj<typeof meta>

// More on component testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const HomePage: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const home = canvas.getByTestId('home-page')
    await expect(home).toBeInTheDocument()
  },
}
