import { React, useState, useContext } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../Layout/AlertMessage'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const navigate = useNavigate()
  // Context
  const { registerUser } = useContext(AuthContext)

  // Local state
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })

  const [alert, setAlert] = useState(null);

  const { username, password, confirmPassword } = registerForm

  const onChangeRegisterForm = e => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value
    })
  }

  const register = async e => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setAlert({
        type: 'danger',
        message: 'Passwords do not match!'
      })
      setTimeout(() => {
        setAlert(null)
      }, 3000)
      return;
    }

    try {
      const registerData = await registerUser(registerForm)
      if (!registerData.success) {
        setAlert({
          type: 'danger',
          message: registerData.message
        })
        setTimeout(() => {
          setAlert(null)
        }, 3000)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Form className="my-4" onSubmit={register}>
        <AlertMessage info={alert} />
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>

      <p className="d-flex align-items-center gap-2">
        Already have an account?
        <Button
          variant="info"
          size="sm"
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
      </p>
    </>
  )
}

export default RegisterForm
