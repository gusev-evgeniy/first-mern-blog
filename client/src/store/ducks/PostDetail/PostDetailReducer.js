import { instance } from 'store/api'

const UPDATE_LIKES = 'UPDATE_LIKES'
const FETCH_DATA = 'FETCH_DATA'
const UPDATE_COMMENTS = 'UPDATE_COMMENTS'
const CLEAN_POST = 'CLEAN_POST'

const initialState = {
  body: undefined,
  comments: [],
  data: undefined,
  likes: [],
  snippets: undefined,
  title: undefined,
  _id: ""
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
    case CLEAN_POST: {
      debugger
      return {status: 'UNMOUNTED'}
    }
    default:
      return state
  }
}

export const updateLikes = (likes) => ({ type: UPDATE_LIKES, payload: likes })
export const fetchData = (data) => ({ type: FETCH_DATA, payload: data })
export const cleanPost = () => ({ type:CLEAN_POST })

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
    const response = await instance.get(`/post/${id}`)

    dispatch(fetchData(response.data))
  } catch (error) {
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


