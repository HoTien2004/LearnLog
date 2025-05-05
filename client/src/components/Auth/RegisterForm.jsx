import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const navigate = useNavigate()

  return (
    <>
      <Form className="my-4">
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
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
