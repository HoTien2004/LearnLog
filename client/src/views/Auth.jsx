import React from 'react'
import LoginForm from '../components/Auth/LoginForm'
import RegisterForm from '../components/Auth/RegisterForm'
import {AuthContext} from '../contexts/AuthContext'
import {useContext} from 'react'
import {Navigate} from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

const Auth = ({authRoute}) => {

  const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext)
 
  let body

  if (authLoading) {
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info"/>
      </div>
    )
  } else if (isAuthenticated) {
    return <Navigate to="/dashboard" />
  } else {
    body = (
      <>
        {authRoute === 'login' && <LoginForm />}
        {authRoute === 'register' && <RegisterForm />}
      </>
    )
  }
  
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
