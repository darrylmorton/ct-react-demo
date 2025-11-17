export const EMAIL_REGEX = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/gm
)

export interface Values {
  firstName: string
  lastName: string
  username: string
  password: string
  confirmPassword: string
}

export const request = async (values: Values) => {
  return await fetch('http://localhost:3001/api/signup', {
    mode: 'no-cors',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      password: values.password,
    }),
  })
}
