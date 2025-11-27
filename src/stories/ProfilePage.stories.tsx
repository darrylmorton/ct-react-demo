import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within, screen } from 'storybook/test'
import { MemoryRouter, Routes, Route } from 'react-router'

import { AuthProvider } from '../Pages/AuthProvider'
import { ProtectedRoutes } from '../Pages/ProtectedRoutes'
import Profile from '../Pages/Profile'
import { authToken } from '../helpers/AppHelper.tsx'

const meta = {
  title: 'Profile/Page',
  component: Profile,
} satisfies Meta<typeof Profile>

export default meta
type Story = StoryObj<typeof meta>

export const RedirectsToLoginWithoutAuthToken: Story = {
  render: () => (
    <MemoryRouter initialEntries={['/user/profile']}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />

          <Route path="/user" element={<ProtectedRoutes />}>
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.findByText('Login Page')).resolves.toBeInTheDocument()
  },
}

export const ProfilePageSuccessful: Story = {
  beforeEach: async () => {
    // store token under the key the app expects
    localStorage.setItem('authToken', authToken)
  },
  afterEach: async () => {
    // clean up the token so other stories aren't impacted
    localStorage.removeItem('authToken')
  },
  render: () => (
    <MemoryRouter initialEntries={['/user/profile']}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />

          <Route path="/user" element={<ProtectedRoutes />}>
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  ),
  play: async () => {
    expect(await screen.findByText('Profile')).toBeInTheDocument()
  },
}
