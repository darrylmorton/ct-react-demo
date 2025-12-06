import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, screen, fireEvent, mocked } from 'storybook/test'

import Signup from '../../Pages/Signup.tsx'
import { request } from '../../utils/AppUtil.ts'
import { assertStorySignupPageElements } from '../../helpers/StoryHelper.tsx'

const meta = {
  title: 'Signup/Page',
  component: Signup,
} satisfies Meta<typeof Signup>

export default meta
type Story = StoryObj<typeof meta>

// More on component testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const SignupPageInvalid: Story = {
  play: async ({ canvasElement }) => {
    const { signupButton } = await assertStorySignupPageElements(canvasElement)

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
    const {
      firstNameInput,
      lastNameInput,
      usernameInput,
      passwordInput,
      confirmPasswordInput,
      signupButton,
    } = await assertStorySignupPageElements(canvasElement)

    fireEvent.change(firstNameInput, {
      target: { value: 'John' },
    })
    fireEvent.change(lastNameInput, {
      target: { value: 'Doe' },
    })
    fireEvent.change(usernameInput, {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(passwordInput, {
      target: { value: 'password123' },
    })
    fireEvent.change(confirmPasswordInput, {
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
    const {
      firstNameInput,
      lastNameInput,
      usernameInput,
      passwordInput,
      confirmPasswordInput,
      resetButton,
    } = await assertStorySignupPageElements(canvasElement)

    fireEvent.change(firstNameInput, {
      target: { value: 'John' },
    })
    fireEvent.change(lastNameInput, {
      target: { value: 'Doe' },
    })
    fireEvent.change(usernameInput, {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(passwordInput, {
      target: { value: 'password123' },
    })
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password123' },
    })

    await userEvent.click(resetButton)

    expect(firstNameInput).toHaveTextContent('')
    expect(lastNameInput).toHaveTextContent('')
    expect(usernameInput).toHaveTextContent('')
    expect(passwordInput).toHaveTextContent('')
    expect(confirmPasswordInput).toHaveTextContent('')
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
    const {
      firstNameInput,
      lastNameInput,
      usernameInput,
      passwordInput,
      confirmPasswordInput,
      signupButton,
    } = await assertStorySignupPageElements(canvasElement)

    fireEvent.change(firstNameInput, {
      target: { value: 'John' },
    })
    fireEvent.change(lastNameInput, {
      target: { value: 'Doe' },
    })
    fireEvent.change(usernameInput, {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(passwordInput, {
      target: { value: 'password123' },
    })
    fireEvent.change(confirmPasswordInput, {
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
    const {
      firstNameInput,
      lastNameInput,
      usernameInput,
      passwordInput,
      confirmPasswordInput,
      signupButton,
    } = await assertStorySignupPageElements(canvasElement)

    fireEvent.change(firstNameInput, {
      target: { value: 'John' },
    })
    fireEvent.change(lastNameInput, {
      target: { value: 'Doe' },
    })
    fireEvent.change(usernameInput, {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(passwordInput, {
      target: { value: 'password123' },
    })
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password123' },
    })

    await userEvent.click(signupButton)

    expect(
      await screen.findByText('Submitted successfully')
    ).toBeInTheDocument()
  },
}
