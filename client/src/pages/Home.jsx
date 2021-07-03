import React from 'react'
import { CircularProgress, makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsList, getPostsListStatus } from '../store/selectors/Selectors'
import { loadPostList, fetchPosts, changeStatus, loadPostListBySubscriptions } from 'store/ducks/PostsList/PostsListReducer';
import { SubmitForm } from 'components/SubmitForm';
import { PostsList } from 'components/PostsList';

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: 10,
    padding: '0 16px',
    borderBottom: '1px solid  #EBEEF0',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    top: 0,
    padding: 16,
    fontSize: 22,
    fontWeight: 800,
    borderBottom: '1px solid  #EBEEF0',
    zIndex: 100,
    backgroundColor: '#fff'
  },
  divider: {
    display: 'flex',
    flex: 1,
    height: 13,
    backgroundColor: '#f7f9fa',
  },
}))

export const Home = () => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const posts = useSelector(getPostsList)

  useEffect(() => {
    dispatch(loadPostListBySubscriptions())
    return () => {
      dispatch(fetchPosts([]))
      dispatch(changeStatus(true))
    }
  }, [dispatch])

  return <>
    <div className={classes.title}>
      Home
    </div>
    <div className={classes.formWrapper}>
      <SubmitForm />
    </div>
    <div className={classes.divider}></div>
    <PostsList posts={posts} />
  </>
}