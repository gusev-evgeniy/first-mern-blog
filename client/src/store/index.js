import { combineReducers } from 'redux'
import { PostsListReducer } from './ducks/PostsList/PostsListReducer'
import { PostDetailReducer } from './ducks/PostDetail/PostDetailReducer'
import { UserReducer } from './ducks/User/UserReducer'
import {InitializeReducer} from './ducks/Initialize/InitializeReducer';
import {TagReducer} from './ducks/Tags/TagReducer';
import {SearchReducer} from './ducks/Search/SearchReducer';

export const index = combineReducers({
  PostsListReducer,
  PostDetailReducer,
  AuthReducer: UserReducer,
  InitializeReducer,
  TagReducer,
  SearchReducer
})