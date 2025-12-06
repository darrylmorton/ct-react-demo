import type { Meta, StoryObj } from '@storybook/react-vite'
import { userEvent, within, expect, screen } from 'storybook/test'

import { HamburgerMenu } from '../../Components/Navigation/HamburgerMenu.tsx'

const meta = {
  title: 'HamburgerMenu/Navigation',
  component: HamburgerMenu,
} satisfies Meta<typeof HamburgerMenu>

export default meta
type Story = StoryObj<typeof meta>

export const HamburgerMenuSuccess: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const hamburgerMenu = await canvas.findByTestId('hamburger-menu')

    await userEvent.click(hamburgerMenu)

    expect(await screen.findByText('Home')).toBeInTheDocument()
    expect(await screen.findByText('About')).toBeInTheDocument()
    expect(await screen.findByText('Contact')).toBeInTheDocument()
  },
}

export const HamburgerSelectedMenuItemHome: Story = {
  render: () => <HamburgerMenu selectedPage="home" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const hamburgerMenu = await canvas.findByTestId('hamburger-menu')

    await userEvent.click(hamburgerMenu)

    expect(
      await screen.findByTestId('selected-menu-item-home')
    ).toBeInTheDocument()
  },
}

export const HamburgerSelectedMenuItemAbout: Story = {
  render: () => <HamburgerMenu selectedPage="about" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const hamburgerMenu = await canvas.findByTestId('hamburger-menu')

    await userEvent.click(hamburgerMenu)

    expect(
      await screen.findByTestId('selected-menu-item-about')
    ).toBeInTheDocument()
  },
}
