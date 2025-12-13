import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import About from '../../Pages/About.tsx'

const meta = {
  title: 'Page/About',
  component: About,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof About>

export default meta
type Story = StoryObj<typeof meta>

// More on component testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const AboutPage: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const about = canvas.getByTestId('about-page')
    await expect(about).toBeInTheDocument()
  },
}
