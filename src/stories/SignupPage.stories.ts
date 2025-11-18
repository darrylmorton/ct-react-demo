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
import { request, type RequestValues } from '../util/AppUtil.ts'

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
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument()
  },
}

export const SignupPageUnsuccessful: Story = {
  beforeEach: async () => {
    /*
     * The `trackEvent` function is already a mock!
     * The `mocked` utility is just for proper mock function types
     */
    mocked(request).mockResolvedValue({
      json: () => {
        return Promise.resolve({ status: 400 })
      },
      url: 'http://localhost:3001/api/signup',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      status: 400,
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

    await expect(request).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      username: 'john@example.com',
      password: 'password123',
    } as RequestValues)

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

    expect(screen.findByText('Required')).toEqual(Promise.resolve({}))
    expect(screen.findByText('Passwords do not match')).toEqual(
      Promise.resolve({})
    )

    expect(screen.findByText('First Name')).toEqual(Promise.resolve({}))
    expect(screen.findByText('Last Name')).toEqual(Promise.resolve({}))
    expect(screen.findByText('Username')).toEqual(Promise.resolve({}))
    expect(screen.findByText('Password')).toEqual(Promise.resolve({}))
    expect(screen.findByText('Confirm Password')).toEqual(Promise.resolve({}))
  },
}

export const SignupPageError: Story = {
  beforeEach: async () => {
    /*
     * The `trackEvent` function is already a mock!
     * The `mocked` utility is just for proper mock function types
     */
    mocked(request).mockResolvedValue({
      json: () => {
        return Promise.reject({ status: 500 })
      },
      url: 'http://localhost:3001/api/signup',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      status: 500,
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

    await expect(request).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      username: 'john@example.com',
      password: 'password123',
    } as RequestValues)

    expect(
      await screen.findByText('There was a problem submitting the form')
    ).toBeInTheDocument()
  },
}
