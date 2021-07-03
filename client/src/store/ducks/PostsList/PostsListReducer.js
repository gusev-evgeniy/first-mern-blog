import { instance } from '../../api'

const FETCH_POSTS = 'FETCH_POSTS'
const CHANGE_STATUS = 'posts/CHANGE_STATUS'
const DELETE_POST = 'posts/DELETE_POST'
const UNSHIFT_NEW_TWEET = 'posts/UNSHIFT_NEW_TWEET'
const ADD_BOOKMARK = 'posts/ADD_BOOKMARK'
const DELETE_BOOKMARK = 'posts/DELETE_BOOKMARK'
const ADD_LIKE = 'posts/ADD_LIKE'
const DELETE_LIKE = 'posts/DELETE_LIKE'

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
    case DELETE_POST:
      return { ...state, posts: state.posts.filter(post => post._id !== action.payload) }
    case ADD_BOOKMARK:
      return {
        ...state, posts: state.posts.map(post => {
          if (post._id === action.payload.postId) {
            post.bookmarks = [...post.bookmarks, action.payload.profileId]
            return post
          }
          return post
        })
      }
    case DELETE_BOOKMARK:
      return {
        ...state, posts: state.posts.map(post => {
          if (post._id === action.payload.postId) {
            post.bookmarks = post.bookmarks.filter(bookmark => bookmark !== action.payload.profileId)
            return post
          }
          return post
        })
      }
    case ADD_LIKE:
      return {
        ...state, posts: state.posts.map(post => {
          if (post._id === action.payload.postId) {
            post.likes = [...post.likes, action.payload.profileId]
            return post
          }
          return post
        })
      }
    case DELETE_LIKE:
      return {
        ...state, posts: state.posts.map(post => {
          if (post._id === action.payload.postId) {
            post.likes = post.likes.filter(bookmark => bookmark !== action.payload.profileId)
            return post
          }
          return post
        })
      }
    case UNSHIFT_NEW_TWEET: //не работает. изменить добавление твиттов 
      return { ...state, posts: [action.payload, ...state.posts] }
    default:
      return state
  }
}

export const fetchPosts = posts => ({ type: FETCH_POSTS, payload: posts })
export const changeStatus = status => ({ type: CHANGE_STATUS, payload: status })
export const deleteAction = postId => ({ type: DELETE_POST, payload: postId })
export const unshiftNewTweetAction = (tweet) => ({ type: UNSHIFT_NEW_TWEET, payload: tweet })
export const addBookmarkAction = (postId, profileId) => ({ type: ADD_BOOKMARK, payload: { postId, profileId } })
export const deleteBookmarkAction = (postId, profileId) => ({ type: DELETE_BOOKMARK, payload: { postId, profileId } })

export const addLikeAction = (postId, profileId) => ({ type: ADD_LIKE, payload: { postId, profileId } })
export const deleteLikeAction = (postId, profileId) => ({ type: DELETE_LIKE, payload: { postId, profileId } })

export const loadPostList = () => async dispatch => {
  try {
    dispatch(changeStatus(true))
    const { data } = await instance.get('/posts')
    dispatch(changeStatus(false))
    dispatch(fetchPosts(data))
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

export const loadPostListBySubscriptions = () => async dispatch => {
  try {
    dispatch(changeStatus(true))
    const response = await instance.get(`/subscriptions`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    dispatch(changeStatus(false))
    dispatch(fetchPosts(response.data))
  } catch (error) {
    dispatch(changeStatus(false))
    console.log(error.response.data.message)
  }
}

export const addNewPost = (data) => async dispatch => {
  const { body, tags, image, replyPostId } = data
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

export const sendBookmark = (postId, profileId) => async dispatch => {
  try {
    const response = await instance.put(`/post/${postId}/bookmarks`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    dispatch(addBookmarkAction(postId, profileId))
  } catch (error) {
    console.log(error)
  }
}

export const deleteBookmark = (postId, profileId) => async dispatch => {
  try {
    const response = await instance.delete(`/post/${postId}/bookmarks`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    dispatch(deleteBookmarkAction(postId, profileId))
  } catch (error) {
    console.log(error)
  }
}

export const sendLike = (postId, profileId) => async dispatch => {
  try {
    const response = await instance.put(`/post/${postId}/like`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    dispatch(addLikeAction(postId, profileId))
  } catch (error) {
    console.log(error.response.data.message)
  }
}

export const deleteLike = (postId, profileId) => async dispatch => {
  try {
    const response = await instance.delete(`/post/${postId}/like`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })

    dispatch(deleteLikeAction(postId, profileId))
  } catch (error) {
    console.log(error.response.data.message)
  }
}

export const getPostsByBookmarks = () => async dispatch => {
  try {
    dispatch(changeStatus(true))
    const { data } = await instance.get('/bookmarks', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    dispatch(changeStatus(false))
    dispatch(fetchPosts(data))
  } catch (error) {
    dispatch(changeStatus(false))
    console.log(error)
  }
}

export const getUserPosts = (id) => async dispatch => {
  try {
    dispatch(changeStatus(true))
    const { data } = await instance.get(`/posts/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    dispatch(changeStatus(false))
    dispatch(fetchPosts(data))
  } catch (error) {
    dispatch(changeStatus(false))
    console.log(error)
  }
}