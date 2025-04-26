import React from 'react'
import LoginForm from '../components/Auth/LoginForm'
import RegisterForm from '../components/Auth/RegisterForm'

const Auth = ({authRoute}) => {
  return (
    <>
        <h1>Hello</h1>
        {authRoute === 'login' && <LoginForm />}
        {authRoute === 'register' && <RegisterForm />}
    </>
  )
}

export default Auth
