import { PostCard } from 'components/PostCard';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatus, fetchPosts } from 'store/ducks/PostsList/PostsListReducer';
import { getPostsList, getUserInfo } from 'store/selectors/Selectors';

export const Search = () => {
  const posts = useSelector(state => getPostsList(state))
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(changeStatus(true))
      dispatch(fetchPosts([]))
    }
  }, [dispatch])

  const { _id } = useSelector(state => getUserInfo(state))
  return (
    <div>
      {posts.map(tweet => <PostCard key={tweet._id} postData={tweet} userId={_id} />)}
    </div>
  )
}
