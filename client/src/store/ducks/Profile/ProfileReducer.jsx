import { profileAPI } from './ProfileApi'

const FETCH = 'profile/Fetch'
const CHANGE_STATUS = 'profile/CHANGE_STATUS'

const initialState = {
  status: null,
  profile: {},
}

export const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_STATUS:
      return { ...state, status: action.payload }
    case FETCH:
      return { ...state, profile: action.payload }
    default:
      return state
  }
}

export const fetchAction = (data) => ({ type: FETCH, payload: data })
export const changeStatusAction = (status) => ({ type: CHANGE_STATUS, payload: status })

export const fetchProfile = (id) => async dispatch => {
  try {
    dispatch(changeStatusAction('LOADING'))
    const { data } = await profileAPI.get(id)
    dispatch(changeStatusAction('LOADED'))
    dispatch(fetchAction(data))

  } catch (e) {
    dispatch(changeStatusAction('ERROR'))
    console.log(e)
  }
}