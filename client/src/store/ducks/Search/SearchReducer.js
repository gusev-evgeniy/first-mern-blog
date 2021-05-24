import {instance} from '../../api';

const FETCH = 'searchReducer/FETCH'
const CHANGE_STATUS = 'searchReducer/CHANGE_STATUS'

const initialState = {
  status: 'NEVER',
  field: '',
  postsList: [],
  message: ''
}

export const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH:
      debugger
      return {...state, postsList: action.payload}
    case CHANGE_STATUS:
      return {...state, status: action.payload}
    default:
      return state
  }
}

const fetchPosts = (posts) => ({type: FETCH, payload: posts})
const changeStatus = (status) => ({type: CHANGE_STATUS, payload: status})

export const requestSearchPosts = (tag) => async dispatch => {
  try {
    debugger
    dispatch(changeStatus('LOADING'))
    const response = await instance.get(`/search/?tag=${tag}`)
    dispatch(changeStatus('SUCCESS'))
    dispatch(fetchPosts(response.data))
  } catch (e) {
    dispatch(changeStatus('ERROR'))
    console.log(e)
  }
}