import { instance } from '../../api'

const GET_POSTS = 'GET_POSTS'

export const PostsListReducer = (state = [], action) => {
  switch (action.type) {
    case GET_POSTS:
      return action.payload
    default:
      return state
  }
}

const getPosts = posts => ({ type: GET_POSTS, payload: posts })

export const loadPostList = () => async dispatch => {
  try {
    const response = await instance.get('/')
    dispatch(getPosts(response.data))
  } catch (error) {
    console.log(error.response.data.message)
  }
}

export const addNewPost = (data) => async dispatch => {
  try {
    await instance.post('/', { ...data }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    dispatch(loadPostList())
  } catch (error) {
    console.log(error.response.data.message)
  }
}

export const deletePost = (id) => async dispatch => {
  try {
    await instance.delete(`/post/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    dispatch(loadPostList())
  } catch (error) {
    console.log(error.response.data.message)
  }
}