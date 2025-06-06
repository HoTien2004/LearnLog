import React, { createContext, useReducer, useState } from 'react'
import { PostReducer } from '../reducers/PostReducer'
import { apiUrl, POSTS_LOADED_SUCCESS, POSTS_LOADED_FAIL } from './constants'
import axios from 'axios'

export const PostContext = createContext()

export const PostContextProvider = ({ children }) => {
  const [postState, dispatch] = useReducer(PostReducer, {
    posts: [],
    postsLoading: true,
  })

  const [isOpenModal, setIsOpenModal] = useState(false)

  // Get all posts
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`)
      if (response.data.success) {
        dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.data.posts })
      }
    } catch (error) {
      dispatch({ type: POSTS_LOADED_FAIL })
    }
  }

  // Post context data
  const postContextData = { postState, getPosts, isOpenModal, setIsOpenModal }

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>

  )
}


