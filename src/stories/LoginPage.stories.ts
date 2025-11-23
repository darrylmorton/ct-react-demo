import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  expect,
  within,
  userEvent,
  screen,
  fireEvent,
  mocked,
} from 'storybook/test'
import { vi } from 'vitest'

import Login from '../Pages/Login'
import { request, type LoginRequestValues } from '../util/AppUtil.ts'

const meta = {
  title: 'Login/Page',
  component: Login,
} satisfies Meta<typeof Login>

export default meta
type Story = StoryObj<typeof meta>

// More on component testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const LoginPageInvalid: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const resetButton = canvas.getByText('Reset')
    await expect(resetButton).toBeInTheDocument()
    const loginButton = canvas.getByText('Login')
    await expect(loginButton).toBeInTheDocument()

    await userEvent.click(loginButton)

    expect(await screen.findAllByText('Required')).toHaveLength(2)
  },
}

export const LoginPageUnsuccessful: Story = {
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
    const loginButton = canvas.getByText('Login')
    await expect(loginButton).toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText('john@example.com'), {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    })

    await userEvent.click(loginButton)

    await expect(request).toHaveBeenCalledWith('login', {
      username: 'john@example.com',
      password: 'password123',
    } as LoginRequestValues)

    expect(
      await screen.findByText('Submitted unsuccessfully')
    ).toBeInTheDocument()
  },
}

export const LoginPageResponseUnsuccessful: Story = {
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
    const loginButton = canvas.getByText('Login')
    await expect(loginButton).toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText('john@example.com'), {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    })

    await userEvent.click(loginButton)

    await expect(request).toHaveBeenCalledWith('login', {
      username: 'john@example.com',
      password: 'password123',
    } as LoginRequestValues)

    expect(
      await screen.findByText('There was a problem submitting the form')
    ).toBeInTheDocument()
  },
}

export const LoginPageReset: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const resetButton = canvas.getByText('Reset')
    await expect(resetButton).toBeInTheDocument()
    const loginButton = canvas.getByText('Login')
    await expect(loginButton).toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText('john@example.com'), {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    })

    await userEvent.click(resetButton)

    expect(screen.queryByPlaceholderText('john@example.com')).toHaveTextContent(
      ''
    )
    expect(screen.queryByPlaceholderText('Password')).toHaveTextContent('')
  },
}

export const LoginPageError: Story = {
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
    const loginButton = canvas.getByText('Login')
    await expect(loginButton).toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText('john@example.com'), {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    })

    await userEvent.click(loginButton)

    await expect(request).toHaveBeenCalledWith('login', {
      username: 'john@example.com',
      password: 'password123',
    } as LoginRequestValues)

    expect(
      await screen.findByText('There was a problem submitting the form')
    ).toBeInTheDocument()
  },
}

export const LoginPageSuccessful: Story = {
  beforeEach: async () => {
    mocked(request).mockResolvedValue({
      json: async () => {
        return Promise.resolve({
          status: 200,
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        })
      },
    } as Response)
    vi.spyOn(Storage.prototype, 'setItem')
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const resetButton = canvas.getByText('Reset')
    await expect(resetButton).toBeInTheDocument()
    const loginButton = canvas.getByText('Login')
    await expect(loginButton).toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText('john@example.com'), {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    })

    await userEvent.click(loginButton)

    await expect(request).toHaveBeenCalledWith('login', {
      username: 'john@example.com',
      password: 'password123',
    } as LoginRequestValues)

    expect(
      await screen.findByText('Submitted successfully')
    ).toBeInTheDocument()

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    )

    vi.resetAllMocks()
  },
}
