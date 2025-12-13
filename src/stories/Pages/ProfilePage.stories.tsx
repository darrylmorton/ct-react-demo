import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, screen } from 'storybook/test'
import { MemoryRouter, Routes, Route } from 'react-router'

import { AuthProvider } from '../../Components/Auth/AuthProvider.tsx'
import { ProtectedRoutes } from '../../Components/Auth/ProtectedRoutes.tsx'
import Profile from '../../Pages/Profile.tsx'
import { authToken } from '../../helpers/AppHelper.tsx'
import Login from '../../Pages/Login.tsx'
import { assertStoryLoginPageElements } from '../../helpers/StoryHelper.tsx'

const meta = {
  title: 'Page/Profile',
  component: Profile,
} satisfies Meta<typeof Profile>

export default meta
type Story = StoryObj<typeof meta>

export const RedirectsToLoginWithoutAuthToken: Story = {
  render: () => (
    <MemoryRouter initialEntries={['/user/profile']}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/user" element={<ProtectedRoutes />}>
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  ),
  play: async ({ canvasElement }) => {
    await assertStoryLoginPageElements(canvasElement)
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
