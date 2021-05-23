export const getPostDetail = (state) => {
  return state.PostDetailReducer.post
}

export const getPostDetailStatus = (state) => {
  return state.PostDetailReducer.isLoading
}

export const getPostsList = (state) => {
  return state.PostsListReducer.posts
}

export const getPostsListStatus = (state) => {
  return state.PostsListReducer.isLoading
}

export const getUserInfo = (state) => {
  return state.AuthReducer.user
}

export const isAuthInfo = (state) => {
  return state.AuthReducer.isAuth
}

export const isFetchingInfo = (state) => {
  return state.AuthReducer.isFetching
}

export const isInitializedInfo = (state) => {
  return state.InitializeReducer.isInitialized
}

export const showError = (state) => {
  return state.AuthReducer.errors
}

export const loadDefaultImage = (state) => {
  return state.InitializeReducer.defaultImage
}