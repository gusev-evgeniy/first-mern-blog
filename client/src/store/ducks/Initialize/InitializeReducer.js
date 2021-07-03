import { auth } from '../User/UserReducer'

const INITIALIZE = 'INITIALIZE'

const initialState = {
  isInitialized: false,
  defaultImage: 'https://manskkp.lv/assets/images/users/default-user.png'
}

export const InitializeReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE:
      return { ...state, isInitialized: true }
    default:
      return state
  }
}

export const setInitialized = () => ({ type: INITIALIZE })

export const initializeApp = () => async dispatch => {
  await dispatch(auth())

  dispatch(setInitialized())
}