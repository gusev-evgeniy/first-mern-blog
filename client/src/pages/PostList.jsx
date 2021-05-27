import React from 'react'
import { Card, CircularProgress, makeStyles, Typography } from '@material-ui/core';
import { PostCard } from '../components/PostCard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsList, getPostsListStatus, getUserInfo } from '../store/selectors/Selectors'
import { deletePost, loadPostList, fetchPosts } from 'store/ducks/PostsList/PostsListReducer';
import { SubmitForm } from 'components/SubmitForm';

const useStyles = makeStyles((theme) => ({
  postListWrapper: {
    position: 'relative',
    width: '100%'
  },
  title: {
    position: 'fixed',
    padding: 16,
    left: 0,
    fontSize: 22,
    fontWeight: 800,
    borderBottom: '1px solid  #EBEEF0',
    zIndex: 100,
    backgroundColor: '#fff'
  },
  formWrapper: {
    marginTop: 72,
    padding: '0 16px',
    borderBottom: '1px solid  #EBEEF0',
  }
}))

export const PostList = () => {
  const classes = useStyles()

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

  return <div className={classes.postListWrapper}>
    <div className={classes.title}>
      Home
    </div>
    <div className={classes.formWrapper}>
      <SubmitForm />
    </div>
    {posts.map(post => {
      return <PostCard key={post._id} postData={post} handleDeletePost={handleDeletePost} userId={_id} />
    })}
  </div>
}