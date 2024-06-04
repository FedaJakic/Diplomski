import React, { useEffect, useState } from 'react'
import styles from './register.module.css'
import { Alert, Button, Container, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import {
  RegisterForm,
  RegisterFormElements,
  registerFormConfig,
} from './registerConfig'
import { UserUrlsApi } from '../../api/user'
import { PagesURLs } from '../../util/env'

const Register: React.FC = () => {
  const { register, handleSubmit } = useForm<RegisterForm>()
  const [showAlert, setShowAlert] = useState<boolean>(false)

  const submitHandler = async (data: RegisterForm): Promise<void> => {
    try {
      const response = await UserUrlsApi.registerUser({
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email,
        password: data.password,
        date_of_birth: data.date_of_birth,
      })

      if (!response.success) setShowAlert(true)

      window.location.href = PagesURLs.Login
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const closeAlert = setTimeout(() => {
      setShowAlert(false)
    }, 5000)

    return () => {
      clearTimeout(closeAlert)
    }
  }, [showAlert])

  return (
    <Container className="h-100">
      <Row>
        <div className="col-md-6 offset-md-3">
          <div className="card my-5">
            <div className={`card-body ${styles.cardbodyColor} p-lg-5`}>
              <div className="text-center">
                <h1>Register</h1>
                {showAlert && (
                  <Alert key={'danger'} variant={'danger'}>
                    Sorry, we faced some errors!
                  </Alert>
                )}

                <img
                  src={'/assets/bitcoin.webp'}
                  className={`img-fluid ${styles.profileImagePic} img-thumbnail rounded-circle my-3`}
                  alt="profile"
                />
              </div>

              <Form onSubmit={handleSubmit(submitHandler)}>
                {Object.entries(registerFormConfig).map(([key, value]) => (
                  <Form.Group className="mb-3" controlId={key} key={key}>
                    <Form.Label>{value.label}</Form.Label>
                    <Form.Control
                      placeholder={value.placeholder}
                      {...register(key as RegisterFormElements)}
                      type={value.type}
                      required={value.required}
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>
                ))}

                <div className="text-center m-4">
                  <Button variant="primary" type="submit">
                    Register
                  </Button>
                </div>
              </Form>

              <div className="form-text text-center mb-5 text-dark">
                Have account? Go to{' '}
                <Link to={PagesURLs.Login} className="text-dark fw-bold">
                  {' '}
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  )
}

export default Register
