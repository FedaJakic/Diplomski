import React, { useEffect, useState } from 'react'
import styles from './register.module.css'
import { Alert, Button, Container, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { LoginForm, LoginFormElements, loginFormConfig } from './loginConfig'
import { Link } from 'react-router-dom'
import { UserUrlsApi } from '../../api/user'

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginForm>()
  const [showAlert, setShowAlert] = useState<boolean>(false)

  const submitHandler = async (data: LoginForm): Promise<void> => {
    try {
      console.log(data)
      const response = await UserUrlsApi.loginUser({
        email: data.email,
        password: data.password,
      })

      if (!response.success) setShowAlert(true)
      else {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('id', response.data.id)
        localStorage.setItem('role', response.data.role)
        localStorage.setItem('firstName', response.data.name)
        localStorage.setItem('lastName', response.data.surname)
        window.location.href = '/'
      }
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
                <h1>Login</h1>
                {showAlert && (
                  <Alert key={'danger'} variant={'danger'}>
                    Invalid email or password!
                  </Alert>
                )}
                <img
                  src={'/assets/bitcoin.webp'}
                  className={`img-fluid ${styles.profileImagePic} img-thumbnail rounded-circle my-3`}
                  alt="profile"
                />
              </div>

              <Form onSubmit={handleSubmit(submitHandler)}>
                {Object.entries(loginFormConfig).map(([key, value]) => (
                  <Form.Group className="mb-3" controlId={key} key={key}>
                    <Form.Label>{value.label}</Form.Label>
                    <Form.Control
                      placeholder={value.placeholder}
                      {...register(key as LoginFormElements)}
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
                Not Registered?{' '}
                <Link to="/" className="text-dark fw-bold">
                  {' '}
                  Create an Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  )
}

export default Login