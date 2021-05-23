import { instance } from '../../api'

const FETCH_POSTS = 'FETCH_POSTS'
const CHANGE_STATUS = 'posts/CHANGE_STATUS'

const initialState = {
  isLoading: true,
  posts: []
}

export const PostsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...state, posts: action.payload }
    case CHANGE_STATUS:
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}

export const fetchPosts = posts => ({ type: FETCH_POSTS, payload: posts })
export const changeStatus = status => ({ type: CHANGE_STATUS, payload: status })

export const loadPostList = () => async dispatch => {
  try {
    dispatch(changeStatus(true))
    const response = await instance.get('/posts')
    dispatch(changeStatus(false))
    dispatch(fetchPosts(response.data))
  } catch (error) {
    dispatch(changeStatus(false))
    console.log(error.response.data.message)
  }
}

export const loadPostListByTags = (tag) => async dispatch => {
  try {
    dispatch(changeStatus(true))
    const response = await instance.get(`/posts/search/?tag=${tag}`)
    dispatch(changeStatus(false))
    dispatch(fetchPosts(response.data))
  } catch (error) {
    dispatch(changeStatus(false))
    console.log(error.response.data.message)
  }
}

export const addNewPost = (data) => async dispatch => {
  const { body, tags, image } = data
  const formData = new FormData()
  formData.append('image', image)
  try {
    await instance.post('/post', { body, tags, formData }, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    dispatch(loadPostList())
  } catch (error) {
    console.log(error.response.data.message)
  }
}

export const sendPostImage = (photo) => async dispatch => {
  const formData = new FormData()
  formData.append('photo', photo)

  try {
    console.log(formData)
    await instance.post('/post/image', formData)
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