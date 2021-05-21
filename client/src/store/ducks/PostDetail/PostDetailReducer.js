import { instance } from 'store/api'

const UPDATE_LIKES = 'UPDATE_LIKES'
const FETCH_DATA = 'FETCH_DATA'
const UPDATE_COMMENTS = 'UPDATE_COMMENTS'
const CHANGE_LOADING = 'CHANGE_LOADING'

const initialState = {
  body: undefined,
  comments: [],
  data: undefined,
  likes: [],
  snippets: undefined,
  title: undefined,
  _id: "",
  isLoading: false
}

export const PostDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA: {
      return action.payload
    }
    case UPDATE_LIKES: {
      return { ...state, likes: action.payload }
    }
    case UPDATE_COMMENTS: {
      return { ...state, comments: [...state.comments, action.payload] }
    }
    case CHANGE_LOADING: {
      return { ...state, isLoading: action.payload }
    }
    default:
      return state
  }
}

export const updateLikes = (likes) => ({ type: UPDATE_LIKES, payload: likes })
export const fetchData = (data) => ({ type: FETCH_DATA, payload: data })
export const changeIsLoading = (boolean) => ({ type: CHANGE_LOADING, payload: boolean })

export const sendLike = (postId) => async dispatch => {
  try {
    const response = await instance.put(`/post/${postId}/like`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })

    dispatch(updateLikes(response.data.likes))
  } catch (error) {
    console.log(error.response.data.message)
  }
}

export const deleteLike = (postId) => async dispatch => {
  try {
    const response = await instance.delete(`/post/${postId}/like`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })

    dispatch(updateLikes(response.data.likes))
  } catch (error) {
    console.log(error.response.data.message)
  }
}

export const loadPost = (id) => async dispatch => {
  try {
    dispatch(changeIsLoading(true))
    const response = await instance.get(`/post/${id}`)
    dispatch(changeIsLoading(false))

    dispatch(fetchData(response.data))
  } catch (error) {
    dispatch(changeIsLoading(false))
    console.log(error.response.data.message)
  }
}

export const sendComment = ({ postId, newComment }) => async dispatch => {
  try {
    await instance.post(`/post/${postId}/comment`, { body: newComment }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })

    dispatch(loadPost(postId))
  } catch (error) {
    console.log(error.response.dara.message)
  }
}


