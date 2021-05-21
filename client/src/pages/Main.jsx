import { Card, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { getUserInfo, isAuthInfo } from 'store/selectors/Selectors'
import { PostCard } from '../components/PostsList/PostCard'
import { loadPostList, deletePost } from '../store/ducks/PostsList/PostsListReducer'
import { LoginNotification } from '../components/PostsList/Profile/LoginNotification'
import { Profile } from '../components/PostsList/Profile/Profile'
import { PopularTags } from 'components/PostsList/PopularTags'
import { PostList } from '../components/PostList';
import PostPage from './FullPostPage';
import { Route } from 'react-router-dom';
import FullPost from '../components/FullPost';

const Main = ({ loadPostList, postsList, deletePost, userInfo }) => {
  const isAuth = useSelector(state => isAuthInfo(state))

  useEffect(() => {
    loadPostList()
  }, [loadPostList])

  const showPosts = () => {
    if (postsList.length === 0) {
      return <Card >
        <Typography gutterBottom variant="h6" color='primary'> There are no posts yet</Typography>
      </Card>
    }
    return postsList.map(post => {
      return <PostCard key={post._id} postData={post} deletePost={deletePost} userId={userInfo._id} />
    })
  }

  return <Grid container spacing={2}>
    <Grid item md={3} xs={12}>
      {isAuth ? <Profile /> : <LoginNotification />}
    </Grid>
    <Grid item md={6} xs={12}>
      <Route exact path='/main'>
        <PostList postsList={postsList} deletePost={deletePost} userInfo={userInfo} />
      </Route>
      <Route path='/main/post'>
        <FullPost />
      </Route>
      {/*{showPosts()}*/}
    </Grid>
    <Grid item md={3} xs={12}>
      <PopularTags />
    </Grid>
  </Grid>
}

const mapStateToProps = state => {
  return {
    postsList: state.PostsListReducer,
    userInfo: getUserInfo(state)
  }
}

export default connect(mapStateToProps, { loadPostList, deletePost })(Main)