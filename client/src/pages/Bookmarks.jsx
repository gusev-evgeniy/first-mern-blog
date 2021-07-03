import React from 'react'
import { useEffect } from 'react'
import { CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import { changeStatus, fetchPosts, getPostsByBookmarks } from 'store/ducks/PostsList/PostsListReducer'
import { getPostsList, getPostsListStatus, getUserInfo } from 'store/selectors/Selectors'
import { PostCard } from 'components/PostCard';

export const Bookmarks = () => {
  const dispatch = useDispatch()
  const posts = useSelector(state => getPostsList(state))
  const isLoading = useSelector(state => getPostsListStatus(state))
  const { _id } = useSelector(state => getUserInfo(state))

  useEffect(() => {
    dispatch(getPostsByBookmarks())
    return () => {
      dispatch(fetchPosts([]))
    }
  }, [dispatch])

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <div>
      {posts.map(post => {
        return <PostCard key={post._id} postData={post} userId={_id} />
      })}
    </div>
  )
}
