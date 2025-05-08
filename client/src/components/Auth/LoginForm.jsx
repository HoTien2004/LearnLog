import { React, useState, useContext} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

const LoginForm = () => {
  const navigate = useNavigate()
  // Context
  const { loginUser } = useContext(AuthContext)

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  })

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
        if (loginData.success) {
          navigate('/dashboard')
        } else {
          alert(loginData.message)
        }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Form className="my-4" onSubmit={login}>
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