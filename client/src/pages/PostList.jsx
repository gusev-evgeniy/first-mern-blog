import React from 'react'
import { Card, CircularProgress, Typography } from '@material-ui/core';
import { PostCard } from '../components/PostCard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsList, getPostsListStatus, getUserInfo } from '../store/selectors/Selectors'
import { deletePost, loadPostList, fetchPosts } from 'store/ducks/PostsList/PostsListReducer';

export const PostList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(state => getPostsList(state))
  const isLoading = useSelector(state => getPostsListStatus(state))
  const { _id } = useSelector(state => getUserInfo(state))

  useEffect(() => {
    dispatch(loadPostList())
  }, [loadPostList, dispatch])

  useEffect(() => {
    return () => {
      dispatch(fetchPosts([]))
    }
  }, [])

  const handleDeletePost = (id) => {
    dispatch(deletePost(id))
  }

  if (isLoading) {
    return <CircularProgress />
  }

  if (posts.length === 0) {
    return <Card >
      <Typography gutterBottom variant="h6" color='primary'> There are no posts yet</Typography>
    </Card>
  }

  return posts.map(post => {
    return <PostCard key={post._id} postData={post} handleDeletePost={handleDeletePost} userId={_id} />
  })
}