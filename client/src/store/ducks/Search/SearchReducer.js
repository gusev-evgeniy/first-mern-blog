import { instance } from '../../api';
import { fetchPosts } from '../PostsList/PostsListReducer';

const CHANGE_STATUS = 'searchReducer/CHANGE_STATUS'

const initialState = {
  status: 'NEVER',
  field: '',
  postsList: [],
  message: ''
}

export const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_STATUS:
      return { ...state, status: action.payload }
    default:
      return state
  }
}

const changeStatus = (status) => ({ type: CHANGE_STATUS, payload: status })

export const requestSearchPosts = (tag) => async dispatch => {
  try {
    dispatch(changeStatus('LOADING'))
    const { data } = await instance.get(`/search/?tag=${tag}`)
    dispatch(changeStatus('SUCCESS'))
    dispatch(fetchPosts(data))
  } catch (e) {
    dispatch(changeStatus('ERROR'))
    console.log(e)
  }
}