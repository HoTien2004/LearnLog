import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/login')
  }, [])

  return (
    <div>
      Redirecting to login...
    </div>
  )
}

export default Landing
