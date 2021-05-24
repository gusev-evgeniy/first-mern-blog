import { instance } from '../../api';

const FETCH_TAGS = 'tagsReducer/FETCH_TAGS'

const initialState = {
  topTags: []
}

export const TagReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TAGS:
      return { ...state, topTags: action.payload }
    default:
      return state
  }
}

const fetchTags = (tags) => ({ type: FETCH_TAGS, payload: tags })

export const requestTopTags = () => async dispatch => {
  try {
    const response = await instance.get('/tags')
    dispatch(fetchTags(response.data))
  } catch (error) {
    console.log(error)
  }
}