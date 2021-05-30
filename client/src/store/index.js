import { combineReducers } from 'redux'
import { PostsListReducer } from './ducks/PostsList/PostsListReducer'
import { PostDetailReducer } from './ducks/PostDetail/PostDetailReducer'
import { UserReducer } from './ducks/User/UserReducer'
import { InitializeReducer } from './ducks/Initialize/InitializeReducer';
import { TagReducer } from './ducks/Tags/TagReducer';
import { SearchReducer } from './ducks/Search/SearchReducer';
import { AddTweetReducer } from './ducks/AddTweet/AddTweetReducer';
import { ProfileReducer } from './ducks/Profile/ProfileReducer';

export const index = combineReducers({
  PostsListReducer,
  PostDetailReducer,
  UserReducer,
  InitializeReducer,
  TagReducer,
  SearchReducer,
  AddTweetReducer,
  ProfileReducer
})