import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, screen, fireEvent, mocked } from 'storybook/test'

import ForgotPassword from '../../Pages/ForgotPassword.tsx'
import { MemoryRouter } from 'react-router'
import { assertStoryForgotPasswordPageElements } from '../../helpers/StoryHelper.tsx'
import { request } from '../../utils/AppUtil.ts'

const meta = {
  title: 'Page/ForgotPassword',
  component: ForgotPassword,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ForgotPassword>

export default meta
type Story = StoryObj<typeof meta>

// More on component testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const ForgotPasswordPageInvalid: Story = {
  render: () => (
    <MemoryRouter>
      <ForgotPassword />
    </MemoryRouter>
  ),
  play: async ({ canvasElement }) => {
    const { forgotPasswordButton } =
      await assertStoryForgotPasswordPageElements(canvasElement)

    await userEvent.click(forgotPasswordButton)

    expect(await screen.findAllByText('Required')).toHaveLength(1)
  },
}

export const ForgotPasswordPageUnsuccessful: Story = {
  beforeEach: async () => {
    mocked(request).mockResolvedValue({
      json: async () => {
        return Promise.resolve({ message: 'Error 400', status: 400 })
      },
    } as Response)
  },
  play: async ({ canvasElement }) => {
    const { usernameInput, forgotPasswordButton } =
      await assertStoryForgotPasswordPageElements(canvasElement)

    fireEvent.change(usernameInput, {
      target: { value: 'john@example.com' },
    })

    await userEvent.click(forgotPasswordButton)

    expect(
      await screen.findByText('Submitted unsuccessfully')
    ).toBeInTheDocument()
  },
}

export const ForgotPasswordPageError: Story = {
  beforeEach: async () => {
    mocked(request).mockResolvedValue({
      json: async () => {
        return Promise.reject({ message: 'Error 500', status: 500 })
      },
    } as unknown as Response)
  },
  play: async ({ canvasElement }) => {
    const { usernameInput, forgotPasswordButton } =
      await assertStoryForgotPasswordPageElements(canvasElement)

    fireEvent.change(usernameInput, {
      target: { value: 'john@example.com' },
    })

    await userEvent.click(forgotPasswordButton)

    expect(
      await screen.findByText('There was a problem submitting the form')
    ).toBeInTheDocument()
  },
}

export const ForgotPasswordPageSuccessful: Story = {
  beforeEach: async () => {
    mocked(request).mockResolvedValue({
      json: async () => {
        return Promise.resolve({ status: 200 })
      },
    } as Response)
  },
  play: async ({ canvasElement }) => {
    const { usernameInput, forgotPasswordButton } =
      await assertStoryForgotPasswordPageElements(canvasElement)

    fireEvent.change(usernameInput, {
      target: { value: 'john@example.com' },
    })

    await userEvent.click(forgotPasswordButton)

    expect(
      await screen.findByText('Submitted successfully')
    ).toBeInTheDocument()
  },
}
