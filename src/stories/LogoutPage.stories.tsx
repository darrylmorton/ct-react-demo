import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, screen, mocked } from 'storybook/test'
import { MemoryRouter, Routes, Route } from 'react-router'

import Logout from '../Pages/Logout'
import { request } from '../utils/AppUtil'
import { authToken } from '../helpers/AppHelper.tsx'
import {
  assertStoryLoginPageElements,
  assertStoryLogoutPageElements,
} from '../helpers/StoryHelper.tsx'
import { AuthProvider } from '../Components/Auth/AuthProvider'
import { ProtectedRoutes } from '../Components/Auth/ProtectedRoutes'
import Login from '../Pages/Login.tsx'

const meta = {
  title: 'Logout/Page',
  component: Logout,
} satisfies Meta<typeof Logout>

export default meta
type Story = StoryObj<typeof meta>

export const LogoutPageUnsuccessfulUserNotLoggedIn: Story = {
  render: () => (
    <MemoryRouter initialEntries={['/user/logout']}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/user" element={<ProtectedRoutes />}>
            <Route path="logout" element={<Logout />} />
          </Route>
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  ),
  play: async ({ canvasElement }) => {
    await assertStoryLoginPageElements(canvasElement)
  },
}

export const LogoutPageResponseUnsuccessful: Story = {
  beforeEach: async () => {
    mocked(request).mockResolvedValue({
      json: async () => {
        return Promise.resolve({ status: 400 })
      },
    } as Response)

    localStorage.setItem('authToken', authToken)
  },
  play: async ({ canvasElement }) => {
    const { logoutButton } = await assertStoryLogoutPageElements(canvasElement)

    await userEvent.click(logoutButton)

    expect(
      await screen.findByText('Submitted unsuccessfully')
    ).toBeInTheDocument()
  },
}

export const LogoutPageError: Story = {
  beforeEach: async () => {
    mocked(request).mockResolvedValue({
      json: async () => {
        return Promise.reject({ message: 'Error 500', status: 500 })
      },
    } as unknown as Response)

    localStorage.setItem('authToken', authToken)
  },
  play: async ({ canvasElement }) => {
    const { logoutButton } = await assertStoryLogoutPageElements(canvasElement)

    await userEvent.click(logoutButton)

    expect(
      await screen.findByText('There was a problem submitting the form')
    ).toBeInTheDocument()
  },
}

export const LogoutPageSuccessful: Story = {
  beforeEach: async () => {
    mocked(request).mockResolvedValue({
      json: async () => {
        return Promise.resolve({
          status: 200,
          authToken,
        })
      },
    } as Response)

    localStorage.setItem('authToken', authToken)
  },
  play: async ({ canvasElement }) => {
    const { logoutButton } = await assertStoryLogoutPageElements(canvasElement)

    await userEvent.click(logoutButton)

    expect(
      await screen.findByText('Submitted successfully')
    ).toBeInTheDocument()
  },
}
