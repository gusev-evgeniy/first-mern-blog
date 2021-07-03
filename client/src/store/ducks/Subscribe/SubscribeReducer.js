import { instance } from 'store/api'
import { addSubscriptionAction, deleteSubscriptionAction } from '../User/UserReducer'

const CHANGE_STATUS = 'profile/CHANGE_STATUS'
const DISABLE_BUTTON = 'profile/DISABLE_BUTTON'
const UNDISABLE_BUTTON = 'profile/UNDISABLE_BUTTON'

const initialState = {
  status: 'LOADED',
  disablingButtons: []
}

export const SubscribeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_STATUS:
      return { ...state, status: action.payload }
    case DISABLE_BUTTON:
      return { ...state, disablingButtons: [...state.disablingButtons, action.payload] }
    case UNDISABLE_BUTTON:
      return { ...state, disablingButtons: state.disablingButtons.filter(id => id !== action.payload) }
    default:
      return state
  }
}

export const changeStatusAction = (status) => ({ type: CHANGE_STATUS, payload: status })
export const disableButtonAction = (id) => ({ type: DISABLE_BUTTON, payload: id })
export const undisableButtonAction = (id) => ({ type: UNDISABLE_BUTTON, payload: id })

export const subscribe = (id) => async dispatch => {
  try {
    dispatch(changeStatusAction('LOADING'))
    dispatch(disableButtonAction(id))
    const response = await instance.put(`/profile/subscribe/${id}`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    dispatch(changeStatusAction('LOADED'))
    dispatch(undisableButtonAction(id))
    dispatch(addSubscriptionAction(id))
  } catch (e) {
    dispatch(changeStatusAction('ERROR'))
    dispatch(undisableButtonAction(id))
    console.log(e)
  }
}

export const unsubscribe = (id) => async dispatch => {
  try {
    dispatch(changeStatusAction('LOADING'))
    dispatch(disableButtonAction(id))
    const response = await instance.delete(`/profile/subscribe/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    dispatch(changeStatusAction('LOADED'))
    dispatch(undisableButtonAction(id))
    dispatch(deleteSubscriptionAction(id))
  } catch (e) {
    dispatch(changeStatusAction('ERROR'))
    dispatch(undisableButtonAction(id))
    console.log(e)
  }
}