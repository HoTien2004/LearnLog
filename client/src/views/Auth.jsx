import React from 'react'
import LoginForm from '../components/Auth/LoginForm'
import RegisterForm from '../components/Auth/RegisterForm'

const Auth = ({authRoute}) => {
  let body = (
      <>
        {authRoute === 'login' && <LoginForm />}
        {authRoute === 'register' && <RegisterForm />}
      </>
  )

  return (
    <div className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1>Welcome to Our App</h1>
          {body}
        </div>
      </div>
    </div>
  )
}

export default Auth
