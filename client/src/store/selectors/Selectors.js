export const postDetail = (state) => {
  return state.PostDetailReducer
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