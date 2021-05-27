import { instance } from '../../api'
import { requestTopTags } from '../Tags/TagReducer';

const FETCH_POSTS = 'FETCH_POSTS'
const CHANGE_STATUS = 'posts/CHANGE_STATUS'
const DELETE_POST = 'posts/DELETE_POST'

const initialState = {
  isLoading: true,
  posts: []
}

export const PostsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      debugger
      return { ...state, posts: action.payload }
    case CHANGE_STATUS:
      return { ...state, isLoading: action.payload }
    case DELETE_POST:
      return { ...state, posts: state.posts.filter(post => post._id !== action.payload) }
    default:
      return state
  }
}

export const fetchPosts = posts => ({ type: FETCH_POSTS, payload: posts })
export const changeStatus = status => ({ type: CHANGE_STATUS, payload: status })
export const deleteAction = postId => ({ type: DELETE_POST, payload: postId })

export const loadPostList = () => async dispatch => {
  try {
    dispatch(changeStatus(true))
    const response = await instance.get('/posts')
    dispatch(changeStatus(false))
    dispatch(fetchPosts(response.data))
  } catch (error) {
    dispatch(changeStatus(false))
    console.log(error)
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
  const { body, tags, image, replyPostId } = data
  console.log(replyPostId, image)
  try {
    const response = await instance.post('/post', { body, tags, replyPostId }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (image) {
      await dispatch(sendPostImage(image, response.data._id))
    }
    dispatch(loadPostList())

  } catch (error) {
    console.log(error.response.data.message)
  }
}

export const sendPostImage = (image, id) => async dispatch => {
  const formData = new FormData()
  formData.append('photo', image)
  try {
    await instance.put(`/post/image/${id}`, formData)
  } catch (error) {
    console.log(error.response.data.message)
  }
}

export const deletePost = (id) => async dispatch => {
  try {
    await instance.delete(`/post/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })

    dispatch(deleteAction(id))
  } catch (error) {

    console.log(error)
  }
}