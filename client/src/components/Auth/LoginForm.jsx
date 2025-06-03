import { React, useState, useContext } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../Layout/AlertMessage'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const navigate = useNavigate()
  // Context
  const { loginUser } = useContext(AuthContext)

  // Local state
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  })

  const [alert, setAlert] = useState(null);

  const { username, password } = loginForm

  const onChangeLoginForm = e => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    })
  }

  const login = async e => {
    e.preventDefault()
    try {
      const loginData = await loginUser(loginForm)
      if (!loginData.success) {
        setAlert({
          type: 'danger',
          message: loginData.message
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
      <Form className="my-4" onSubmit={login}>
        <AlertMessage info={alert} />
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={onChangeLoginForm}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>

      <p className="d-flex align-items-center gap-2">
        Don't have an account?
        <Button
          variant="info"
          size="sm"
          onClick={() => navigate('/register')}
        >
          Register
        </Button>
      </p>
    </>
  )
}

export default LoginForm