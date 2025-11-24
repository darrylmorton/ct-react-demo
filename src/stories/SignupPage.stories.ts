import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  expect,
  within,
  userEvent,
  screen,
  fireEvent,
  mocked,
} from 'storybook/test'

import Signup from '../Pages/Signup'
import { request } from '../utils/AppUtil.ts'

const meta = {
  title: 'Signup/Page',
  component: Signup,
} satisfies Meta<typeof Signup>

export default meta
type Story = StoryObj<typeof meta>

// More on component testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const SignupPageInvalid: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const resetButton = canvas.getByText('Reset')
    await expect(resetButton).toBeInTheDocument()
    const signupButton = canvas.getByText('Signup')
    await expect(signupButton).toBeInTheDocument()

    await userEvent.click(signupButton)

    expect(await screen.findAllByText('Required')).toHaveLength(4)
    expect(
      await screen.findByText('Passwords do not match')
    ).toBeInTheDocument()
  },
}

export const SignupPageUnsuccessful: Story = {
  beforeEach: async () => {
    mocked(request).mockResolvedValue({
      json: async () => {
        return Promise.resolve({ message: 'Error 400', status: 400 })
      },
    } as Response)
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const resetButton = canvas.getByText('Reset')
    await expect(resetButton).toBeInTheDocument()
    const signupButton = canvas.getByText('Signup')
    await expect(signupButton).toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText('First Name'), {
      target: { value: 'John' },
    })
    fireEvent.change(screen.getByPlaceholderText('Last Name'), {
      target: { value: 'Doe' },
    })
    fireEvent.change(screen.getByPlaceholderText('john@example.com'), {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'password123' },
    })

    await userEvent.click(signupButton)

    expect(
      await screen.findByText('Submitted unsuccessfully')
    ).toBeInTheDocument()
  },
}

export const SignupPageReset: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const resetButton = canvas.getByText('Reset')
    await expect(resetButton).toBeInTheDocument()
    const signupButton = canvas.getByText('Signup')
    await expect(signupButton).toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText('First Name'), {
      target: { value: 'John' },
    })
    fireEvent.change(screen.getByPlaceholderText('Last Name'), {
      target: { value: 'Doe' },
    })
    fireEvent.change(screen.getByPlaceholderText('john@example.com'), {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'password123' },
    })

    await userEvent.click(resetButton)

    expect(screen.queryByPlaceholderText('First Name')).toHaveTextContent('')
    expect(screen.queryByPlaceholderText('Last Name')).toHaveTextContent('')
    expect(screen.queryByPlaceholderText('john@example.com')).toHaveTextContent(
      ''
    )
    expect(screen.queryByPlaceholderText('Password')).toHaveTextContent('')
    expect(screen.queryByPlaceholderText('Confirm Password')).toHaveTextContent(
      ''
    )
  },
}

export const SignupPageError: Story = {
  beforeEach: async () => {
    mocked(request).mockResolvedValue({
      json: async () => {
        return Promise.reject({ message: 'Error 500', status: 500 })
      },
    } as unknown as Response)
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const resetButton = canvas.getByText('Reset')
    await expect(resetButton).toBeInTheDocument()
    const signupButton = canvas.getByText('Signup')
    await expect(signupButton).toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText('First Name'), {
      target: { value: 'John' },
    })
    fireEvent.change(screen.getByPlaceholderText('Last Name'), {
      target: { value: 'Doe' },
    })
    fireEvent.change(screen.getByPlaceholderText('john@example.com'), {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'password123' },
    })

    await userEvent.click(signupButton)

    expect(
      await screen.findByText('There was a problem submitting the form')
    ).toBeInTheDocument()
  },
}

export const SignupPageSuccessful: Story = {
  beforeEach: async () => {
    mocked(request).mockResolvedValue({
      json: async () => {
        return Promise.resolve({ status: 200 })
      },
    } as Response)
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const resetButton = canvas.getByText('Reset')
    await expect(resetButton).toBeInTheDocument()
    const signupButton = canvas.getByText('Signup')
    await expect(signupButton).toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText('First Name'), {
      target: { value: 'John' },
    })
    fireEvent.change(screen.getByPlaceholderText('Last Name'), {
      target: { value: 'Doe' },
    })
    fireEvent.change(screen.getByPlaceholderText('john@example.com'), {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'password123' },
    })

    await userEvent.click(signupButton)

    expect(
      await screen.findByText('Submitted successfully')
    ).toBeInTheDocument()
  },
}
