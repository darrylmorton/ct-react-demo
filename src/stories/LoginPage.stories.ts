import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  expect,
  userEvent,
  screen,
  fireEvent,
  mocked,
  spyOn,
} from 'storybook/test'

import Login from '../Pages/Login'
import { request, type LoginRequestValues } from '../utils/AppUtil'
import { assertStoryLoginPageElements } from '../helpers/StoryHelper.tsx'

const meta = {
  title: 'Login/Page',
  component: Login,
} satisfies Meta<typeof Login>

export default meta
type Story = StoryObj<typeof meta>

// More on component testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const LoginPageInvalid: Story = {
  play: async ({ canvasElement }) => {
    const { loginButton } = await assertStoryLoginPageElements(canvasElement)

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
    const { usernameInput, passwordInput, loginButton } =
      await assertStoryLoginPageElements(canvasElement)

    fireEvent.change(usernameInput, {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(passwordInput, {
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
    const { usernameInput, passwordInput, loginButton } =
      await assertStoryLoginPageElements(canvasElement)

    fireEvent.change(usernameInput, {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(passwordInput, {
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

export const LoginPageError: Story = {
  beforeEach: async () => {
    mocked(request).mockResolvedValue({
      json: async () => {
        return Promise.reject({ message: 'Error 500', status: 500 })
      },
    } as unknown as Response)
  },
  play: async ({ canvasElement }) => {
    const { usernameInput, passwordInput, loginButton } =
      await assertStoryLoginPageElements(canvasElement)

    fireEvent.change(usernameInput, {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(passwordInput, {
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
          authToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        })
      },
    } as Response)
  },
  play: async ({ canvasElement }) => {
    const spy = spyOn(Storage.prototype, 'setItem')

    const { usernameInput, passwordInput, loginButton } =
      await assertStoryLoginPageElements(canvasElement)

    fireEvent.change(usernameInput, {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(passwordInput, {
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
      'authToken',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    )

    spy.mockRestore()
  },
}
