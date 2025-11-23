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

// TODO envs
export const request = async (requestValues: RequestValues) => {
  console.log('REQUEST_VALUES', requestValues)

  return await fetch('http://localhost:3001/api/signup', {
    mode: 'no-cors',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestValues),
  })
}
