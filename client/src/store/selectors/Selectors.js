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
  return state.UserReducer.user
}

export const isAuthInfo = (state) => {
  return state.UserReducer.isAuth
}

export const isFetchingInfo = (state) => {
  return state.UserReducer.isFetching
}

export const isInitializedInfo = (state) => {
  return state.InitializeReducer.isInitialized
}

export const showError = (state) => {
  return state.UserReducer.errors
}

export const loadDefaultImage = (state) => {
  return state.InitializeReducer.defaultImage
}

export const loadTopTags = (state) => {
  return state.TagReducer.topTags
}

export const getSearchPosts = (state) => {
  return state.SearchReducer
}

export const getProfileInfo = (state) => {
  return state.ProfileReducer
}