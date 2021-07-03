import { instance } from 'store/api'

const CHANGE_STATUS = 'usersListReducer/CHANGE_STATUS'
const FETCH_USERS = 'usersListReducer/FETCH_USERS'

const initialState = {
  isLoading: false,
  users: []
}

export const UsersListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, users: action.payload }
    case CHANGE_STATUS:
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}

export const fetchUsers = users => ({ type: FETCH_USERS, payload: users })
export const changeStatus = status => ({ type: CHANGE_STATUS, payload: status })


export const loadUsersList = () => async dispatch => {
  try {
    dispatch(changeStatus(true))
    const { data } = await instance.get('/users')
    dispatch(changeStatus(false))
    dispatch(fetchUsers(data))
  } catch (error) {
    dispatch(changeStatus(false))
    console.log(error)
  }
}
