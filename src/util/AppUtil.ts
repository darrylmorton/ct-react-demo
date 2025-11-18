export const EMAIL_REGEX = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/gm
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

// TODO envs
export const request = async (requestValues: RequestValues) => {
  return await fetch('http://localhost:3001/api/signup', {
    mode: 'no-cors',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestValues),
  })
}
