export enum RegisterFormElements {
  name = 'name',
  surname = 'surname',
  email = 'email',
  password = 'password',
  dateOfBirth = 'date_of_birth',
}

export interface RegisterForm {
  [RegisterFormElements.name]: string
  [RegisterFormElements.surname]: string
  [RegisterFormElements.email]: string
  [RegisterFormElements.password]: string
  [RegisterFormElements.dateOfBirth]: string
}

export interface RegisterFormElement {
  label: string
  placeholder: string
  type: string
  required: boolean
}

export const registerFormConfig: {
  [key in RegisterFormElements]: RegisterFormElement
} = {
  [RegisterFormElements.name]: {
    label: 'First name',
    placeholder: 'First name',
    type: 'text',
    required: true,
  },
  [RegisterFormElements.surname]: {
    label: 'Last name',
    placeholder: 'Last name',
    type: 'text',
    required: true,
  },
  [RegisterFormElements.dateOfBirth]: {
    label: 'Date of birth',
    placeholder: 'Date of birth',
    type: 'date',
    required: true,
  },
  [RegisterFormElements.email]: {
    label: 'Email address',
    placeholder: 'Enter email',
    type: 'email',
    required: true,
  },
  [RegisterFormElements.password]: {
    label: 'Password',
    placeholder: 'Password',
    type: 'password',
    required: true,
  },
}
