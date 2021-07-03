import { instance } from '../../api'
import { loadPostList } from 'store/ducks/PostsList/PostsListReducer'
import userEvent from '@testing-library/user-event'

const SET_USER = 'SET_USER'
const LOGOUT = 'LOGOUT'
const FETCHING = 'FETCHING'
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR'
const SET_ERROR = 'SET_ERROR'
const ADD_SUBSCRIBE = 'profile/ADD_SUBSCRIBE'
const DELETE_SUBSCRIBE = 'profile/DELETE_SUBSCRIBE'

const initialState = {
  isAuth: false,
  user: {},
  isFetching: false,
  errors: {}
}

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { user: { ...action.payload }, isAuth: true, errors: {} }
    case LOGOUT:
      localStorage.removeItem('token')
      return { user: {}, isAuth: false, errors: {} }
    case FETCHING:
      return { ...state, isFetching: action.payload }
    case ADD_SUBSCRIBE:
      return { ...state, user: { ...state.user, subscriptions: [...state.user.subscriptions, action.payload] } }
    case DELETE_SUBSCRIBE:
      return { ...state, user: { ...state.user, subscriptions: state.user.subscriptions.filter(id => id !== action.payload) } }
    case SET_ERROR:
      return { ...state, errors: action.payload }
    default:
      return state
  }
}

const setUser = data => ({ type: SET_USER, payload: data })
const setFetching = isFetching => ({ type: FETCHING, payload: isFetching })
export const logout = () => ({ type: LOGOUT })
export const setLoginError = (error) => ({ type: SET_LOGIN_ERROR, payload: error })
export const setError = (error) => ({ type: SET_ERROR, payload: error })
export const addSubscriptionAction = (id) => ({ type: ADD_SUBSCRIBE, payload: id })
export const deleteSubscriptionAction = (id) => ({ type: DELETE_SUBSCRIBE, payload: id })

export const login = (email, password) => async dispatch => {
  try {
    dispatch(setFetching(true))
    const response = await instance.post('/login', { email, password })

    dispatch(setUser(response.data.user))
    dispatch(setFetching(false))

    localStorage.setItem('token', response.data.token)
  } catch (error) {
    dispatch(setFetching(false))
    //    dispatch(setError({ loginError: error.response.data.message }))
  }
}

export const createUser = (data) => async dispatch => {
  const { name, password, email } = data
  try {
    dispatch(setFetching(true))
    await instance.post('/profile/signup', { name, password, email }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })

    dispatch(login(email, password))
  } catch (error) {
    dispatch(setFetching(false))
    dispatch(setError({ registrationError: error.response.data.message }))
  }
}

export const auth = () => async dispatch => {
  try {
    dispatch(setFetching(true))
    const response = await instance.get('/auth', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })

    dispatch(setUser(response.data.user))
    dispatch(setFetching(false))

    localStorage.setItem('token', response.data.token)
  } catch (error) {
    dispatch(setFetching(false))
    console.log(error)
    localStorage.removeItem('token')
  }
}

export const uploadPhoto = (photo) => async dispatch => {
  const formData = new FormData()
  formData.append('photo', photo)

  try {
    dispatch(setFetching(true))
    const response = await instance.put('/profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })

    dispatch(setFetching(false))
    dispatch(loadPostList())
    dispatch(setUser(response.data.user))
  } catch (error) {
    console.log(error.response.data.message)
  }
}

export const updateUser = (data) => async dispatch => {
  try {
    dispatch(setFetching(true))
    const response = await instance.put('/profile', { ...data }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })

    dispatch(setFetching(false))
    dispatch(setUser(response.data.user))
  } catch (error) {
    console.log(error)
  }
}
