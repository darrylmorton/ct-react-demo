export const EMAIL_REGEX = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/
)

export type ConfirmAccountRequestValues = {
  confirmAccountToken: string
}

export type ForgotPasswordRequestValues = {
  username: string
}

export type ResetPasswordRequestValues = {
  resetPasswordToken: string
  username: string
  password: string
  confirmPassword: string
}

export interface LogoutRequestValues {
  authToken: string
}

export interface LoginRequestValues {
  username: string
  password: string
}

export interface SignupRequestValues extends LoginRequestValues {
  firstName: string
  lastName: string
}

export interface SignupFormValues extends SignupRequestValues {
  confirmPassword: string
}

export type RequestValues =
  | SignupFormValues
  | ConfirmAccountRequestValues
  | LoginRequestValues
  | LogoutRequestValues
  | ForgotPasswordRequestValues
  | ResetPasswordRequestValues

// Read Vite environment variables (only VITE_ prefixed vars are exposed to the browser)
export const API_BASE = import.meta.env?.VITE_API_BASE as string

export const CORS_MODE = import.meta.env?.VITE_CORS_MODE as string

export const API_URL = `${API_BASE}/api`

export type ApiUrlSuffixType =
  | 'signup'
  | 'confirm-account'
  | 'login'
  | 'logout'
  | 'forgot-password'
  | 'reset-password'

export const request = async (
  apiUrlSuffix: ApiUrlSuffixType,
  requestValues: RequestValues
) => {
  return await fetch(`${API_URL}/${apiUrlSuffix}`, {
    mode: CORS_MODE as RequestMode,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestValues),
  })
}
