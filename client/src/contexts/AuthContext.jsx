import { React, createContext, useReducer } from 'react'
import { AuthReducer } from '../reducers/AuthReducer';
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from './constants'
import axios from 'axios'

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
  const [ authState, authDispatch ] = useReducer(AuthReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  })

  // Login
  const loginUser = async userForm => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`)
      if (response.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
      }
      return response.data
    } catch (error) {
      if (error.response.data) {
        return error.response.data
      } else {
        return {
          success: false,
          message: error.message,
        }
      }
    }
  }

  // Context data
  const authContextData = {loginUser}

  // Return the context provider
  return (
    <AuthContext.Provider value={authContextData }>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider