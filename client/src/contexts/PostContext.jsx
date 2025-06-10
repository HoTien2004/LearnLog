import React, { createContext, useReducer, useState } from 'react'
import { PostReducer } from '../reducers/PostReducer'
import {
  apiUrl,
  POSTS_LOADED_SUCCESS,
  POSTS_LOADED_FAIL,
  ADD_POST,
  DELETE_POST,
  FIND_POST_UPDATE,
  UPDATED_POST
} from './constants'
import axios from 'axios'

export const PostContext = createContext()

export const PostContextProvider = ({ children }) => {
  // State
  const [postState, dispatch] = useReducer(PostReducer, {
    posts: [],
    postUpdate: null,
    postsLoading: true,
  })

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)
  const [showToast, setShowToast] = useState({
    show: false,
    message: '',
    type: null,
  })

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

  // Add post
  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${apiUrl}/posts`, newPost)
      if (response.data.success) {
        dispatch({
          type: ADD_POST,
          payload: response.data.post,
        })
        return response.data
      }
    } catch (error) {
      return error.response.data ? error.response.data : { success: false, message: 'Server error' }
    }
  }

  // Delete post
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${postId}`)
      if (response.data.success) {
        dispatch({
          type: DELETE_POST,
          payload: postId,
        })
        return response.data
      }
    } catch (error) {
      return error.response.data ? error.response.data : { success: false, message: 'Server error' }
    }
  }

  // Find post when user clicks on edit button
  const findPostUpdate = (postId) => {
    const post = postState.posts.find(post => post._id === postId)
    dispatch({
      type: FIND_POST_UPDATE,
      payload: post,
    })
  }

  // Update post
  const updatePost = async (updatedPost) => {
    try {
      const response = await axios.put(`${apiUrl}/posts/${updatedPost._id}`, updatedPost)
      if (response.data.success) {
        dispatch({
          type: UPDATED_POST,
          payload: response.data.post,
        })
        return response.data
      }
    } catch (error) {
      return error.response.data ? error.response.data : { success: false, message: 'Server error' }
    }
  }

  // Post context data
  const postContextData = {
    postState,
    getPosts,
    isOpenModal,
    setIsOpenModal,
    addPost,
    showToast,
    setShowToast,
    showUpdatePostModal,
    setShowUpdatePostModal,
    deletePost,
    findPostUpdate,
    updatePost
  }

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>

  )
}


