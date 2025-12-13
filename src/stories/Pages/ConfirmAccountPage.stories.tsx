import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, screen, mocked } from 'storybook/test'

import ConfirmAccount from '../../Pages/ConfirmAccount.tsx'
import { MemoryRouter } from 'react-router'
import { assertStoryConfirmAccountPageElements } from '../../helpers/StoryHelper.tsx'
import { request } from '../../utils/AppUtil.ts'
import { confirmAccountToken } from '../../helpers/AppHelper.tsx'

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
export const ConfirmAccountPageInvalid: Story = {
  render: () => (
    <MemoryRouter initialEntries={['/?confirmAccountToken=abc123']}>
      <ConfirmAccount />
    </MemoryRouter>
  ),
  play: async ({ canvasElement }) => {
    const { confirmAccountButton } =
      await assertStoryConfirmAccountPageElements(canvasElement)

    await userEvent.click(confirmAccountButton)

    expect(
      await screen.findByText('Invalid confirm account token format')
    ).toBeInTheDocument()
  },
}

export const ConfirmAccountPageUnsuccessful: Story = {
  beforeEach: async () => {
    mocked(request).mockResolvedValue({
      json: async () => {
        return Promise.resolve({ message: 'Error 400', status: 400 })
      },
    } as Response)
  },
  render: () => (
    <MemoryRouter
      initialEntries={[`/?confirmAccountToken=${confirmAccountToken}`]}
    >
      <ConfirmAccount />
    </MemoryRouter>
  ),
  play: async ({ canvasElement }) => {
    const { confirmAccountButton } =
      await assertStoryConfirmAccountPageElements(canvasElement)

    await userEvent.click(confirmAccountButton)

    expect(
      await screen.findByText('Submitted unsuccessfully')
    ).toBeInTheDocument()
  },
}

export const ConfirmAccountPageError: Story = {
  beforeEach: async () => {
    mocked(request).mockResolvedValue({
      json: async () => {
        return Promise.reject({ message: 'Error 500', status: 500 })
      },
    } as unknown as Response)
  },
  render: () => (
    <MemoryRouter
      initialEntries={[`/?confirmAccountToken=${confirmAccountToken}`]}
    >
      <ConfirmAccount />
    </MemoryRouter>
  ),
  play: async ({ canvasElement }) => {
    const { confirmAccountButton } =
      await assertStoryConfirmAccountPageElements(canvasElement)

    await userEvent.click(confirmAccountButton)

    expect(
      await screen.findByText('There was a problem submitting the form')
    ).toBeInTheDocument()
  },
}

export const ConfirmAccountPageSuccessful: Story = {
  beforeEach: async () => {
    mocked(request).mockResolvedValue({
      json: async () => {
        return Promise.resolve({ status: 200 })
      },
    } as Response)
  },
  render: () => (
    <MemoryRouter
      initialEntries={[`/?confirmAccountToken=${confirmAccountToken}`]}
    >
      <ConfirmAccount />
    </MemoryRouter>
  ),
  play: async ({ canvasElement }) => {
    const { confirmAccountButton } =
      await assertStoryConfirmAccountPageElements(canvasElement)

    await userEvent.click(confirmAccountButton)

    expect(
      await screen.findByText('Submitted successfully')
    ).toBeInTheDocument()
  },
}
