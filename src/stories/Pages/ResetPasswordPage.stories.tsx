import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, screen, mocked, fireEvent } from 'storybook/test'

import ResetPassword from '../../Pages/ResetPassword.tsx'
import { MemoryRouter } from 'react-router'
import { assertStoryResetPasswordPageElements } from '../../helpers/StoryHelper.tsx'
import { resetPasswordToken } from '../../helpers/AppHelper.tsx'
import { request } from '../../utils/AppUtil.ts'

const meta = {
  title: 'Page/ResetPassword',
  component: ResetPassword,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ResetPassword>

export default meta
type Story = StoryObj<typeof meta>

// More on component testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const ResetPasswordPageInvalid: Story = {
  render: () => (
    <MemoryRouter
      initialEntries={[`/?resetPasswordToken=${resetPasswordToken}`]}
    >
      <ResetPassword />
    </MemoryRouter>
  ),
  play: async ({ canvasElement }) => {
    const { resetPasswordButton } =
      await assertStoryResetPasswordPageElements(canvasElement)

    await userEvent.click(resetPasswordButton)

    expect(await screen.findAllByText('Required')).toHaveLength(1)
    expect(
      await screen.findByText('Passwords do not match')
    ).toBeInTheDocument()
  },
}

export const ResetPasswordPageUnsuccessful: Story = {
  beforeEach: async () => {
    mocked(request).mockResolvedValue({
      json: async () => {
        return Promise.resolve({ message: 'Error 400', status: 400 })
      },
    } as Response)
  },
  render: () => (
    <MemoryRouter
      initialEntries={[`/?resetPasswordToken=${resetPasswordToken}`]}
    >
      <ResetPassword />
    </MemoryRouter>
  ),
  play: async ({ canvasElement }) => {
    const { passwordInput, confirmPasswordInput, resetPasswordButton } =
      await assertStoryResetPasswordPageElements(canvasElement)

    fireEvent.change(passwordInput, {
      target: { value: 'password123' },
    })
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password123' },
    })

    await userEvent.click(resetPasswordButton)

    expect(
      await screen.findByText('Submitted unsuccessfully')
    ).toBeInTheDocument()
  },
}

export const ResetPasswordPage: Story = {
  beforeEach: async () => {
    mocked(request).mockResolvedValue({
      json: async () => {
        return Promise.resolve({ status: 200 })
      },
    } as Response)
  },
  render: () => (
    <MemoryRouter
      initialEntries={[`/?resetPasswordToken=${resetPasswordToken}`]}
    >
      <ResetPassword />
    </MemoryRouter>
  ),
  play: async ({ canvasElement }) => {
    const { resetPasswordButton, passwordInput, confirmPasswordInput } =
      await assertStoryResetPasswordPageElements(canvasElement)

    fireEvent.change(passwordInput, {
      target: { value: 'password123' },
    })
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password123' },
    })

    await userEvent.click(resetPasswordButton)

    expect(
      await screen.findByText('Submitted successfully')
    ).toBeInTheDocument()
  },
}
