export const EMAIL_REGEX = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/g
)

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
  | LoginRequestValues
  | LogoutRequestValues

// Read Vite environment variables (only VITE_ prefixed vars are exposed to the browser)
export const API_BASE = import.meta.env?.VITE_API_BASE as string
console.log('API_BASE', API_BASE)

export const CORS_MODE = import.meta.env?.VITE_CORS_MODE as string
console.log('CORS_MODE', CORS_MODE)

export const API_URL = `${API_BASE}/api`
console.log('API_URL', API_URL)

export type ApiUrlSuffixType = 'signup' | 'login' | 'logout'

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
