import { instance } from 'store/api'
import { unshiftNewTweetAction } from '../PostsList/PostsListReducer'
import { requestTopTags } from '../Tags/TagReducer'

const CLEAR = 'addTweet/CLEAR'
const UPDATE_FORM = 'addTweet/UPDATE_FORM'
const CHANGE_STATUS = 'addTweet/CHANGE_STATUS'

const initialState = {
  status: null,
}

export const AddTweetReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_STATUS:
      return { ...state, status: action.payload }
    default:
      return state
  }
}

export const clearAction = () => ({ type: CLEAR })
export const updateFormAction = (formData) => ({ type: UPDATE_FORM, payload: formData })
export const changeStatusAction = (status) => ({ type: CHANGE_STATUS, payload: status })

export const addNewTweet = (data) => async dispatch => {
  const { body, image, replyPostId, author } = data
  let response
  try {
    dispatch(changeStatusAction('LOADING'))
    response = await instance.post('/post', { body, replyPostId }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    dispatch(changeStatusAction('LOADED'))

    if (image) {
      response = await dispatch(sendTweetImage(image, response.data._id))
    }
    dispatch(requestTopTags())
    dispatch(unshiftNewTweetAction(response.data))
  } catch (error) {
    dispatch(changeStatusAction('ERROR'))
    console.log(error)
  }
}

export const sendTweetImage = (image, id) => async dispatch => {
  const formData = new FormData()
  formData.append('photo', image)
  try {

    return await instance.put(`/post/image/${id}`, formData)
  } catch (error) {
    dispatch(changeStatusAction('ERROR'))
    console.log(error.response.data.message)
  }
}