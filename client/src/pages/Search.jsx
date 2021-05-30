import { PostCard } from 'components/PostCard';
import React from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getSearchPosts, getUserInfo } from 'store/selectors/Selectors';

export const Search = (props) => {
  const location = useLocation()
  const { postsList } = useSelector(state => getSearchPosts(state))
  debugger
  const { _id } = useSelector(state => getUserInfo(state))
  return (
    <div>
      {postsList.map(tweet => <PostCard key={tweet._id} postData={tweet} userId={_id} />)}
    </div>
  )
}
