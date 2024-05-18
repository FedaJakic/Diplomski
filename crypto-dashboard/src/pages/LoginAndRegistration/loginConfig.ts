export enum LoginFormElements {
  email = 'email',
  password = 'password',
}

export interface LoginForm {
  [LoginFormElements.email]: string
  [LoginFormElements.password]: string
}

export interface LoginFormElement {
  label: string
  placeholder: string
  type: string
  required: boolean
}

export const loginFormConfig: {
  [key in LoginFormElements]: LoginFormElement
} = {
  [LoginFormElements.email]: {
    label: 'Email address',
    placeholder: 'Enter email',
    type: 'text',
    required: true,
  },
  [LoginFormElements.password]: {
    label: 'Password',
    placeholder: 'Password',
    type: 'password',
    required: true,
  },
}
