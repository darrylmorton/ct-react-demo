export const EMAIL_REGEX = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/g
)

export interface RequestValues {
  firstName: string
  lastName: string
  username: string
  password: string
}

export interface FormValues extends RequestValues {
  confirmPassword: string
}

// export type RequestModeType = 'cors' | 'navigate' | 'no-cors' | 'same-origin'

// Read Vite environment variables (only VITE_ prefixed vars are exposed to the browser)
export const API_BASE = import.meta.env?.VITE_API_BASE as string
console.log('API_BASE', API_BASE)

export const CORS_MODE = import.meta.env?.VITE_CORS_MODE as string
console.log('CORS_MODE', CORS_MODE)

export const API_URL = `${API_BASE}/api/signup`
console.log('API_URL', API_URL)

export const request = async (requestValues: RequestValues) => {
  return await fetch(API_URL, {
    mode: CORS_MODE as RequestMode,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestValues),
  })
}

// type RequestMode = Request['mode']
