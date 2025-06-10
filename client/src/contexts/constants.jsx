export const apiUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/api' : 'https://tienho-learnlog.onrender.com/api';

export const LOCAL_STORAGE_TOKEN_NAME = 'learn_log';

export const POSTS_LOADED_SUCCESS = 'POSTS_LOADED_SUCCESS';

export const POSTS_LOADED_FAIL = 'POSTS_LOADED_FAIL';

export const ADD_POST = 'ADD_POST';

export const DELETE_POST = 'DELETE_POST';

export const UPDATED_POST = 'UPDATED_POST';

export const FIND_POST_UPDATE = 'FIND_POST_UPDATE';
