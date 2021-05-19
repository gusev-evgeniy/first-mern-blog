import { Card, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { getUserInfo, isAuthInfo } from 'store/selectors/Selectors'
import { PostCard } from '../components/PostsList/PostCard'
import { loadPostList, deletePost } from '../store/ducks/PostsList/PostsListReducer'
import { LoginNotification } from '../components/PostsList/Profile/LoginNotification'
import { Profile } from '../components/PostsList/Profile/Profile'

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    height: 160,
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

const PostsList = ({ loadPostList, postsList, deletePost, userInfo }) => {
  const classes = useStyles()
  const isAuth = useSelector(state => isAuthInfo(state))

  useEffect(() => {
    loadPostList()
  }, [loadPostList])

  const showPosts = () => {
    if (postsList.length === 0) {
      return <Card className={classes.card}>
        <Typography gutterBottom variant="h6" color='primary'> There are no posts yet</Typography>

      </Card>
    }
    return postsList.map(post => {
      return <PostCard key={post._id} postData={post} deletePost={deletePost} userId={userInfo._id} />
    })
  }

  return <Grid container spacing={2}>
    <Grid item md={8} xs={12}>
      {showPosts()}
    </Grid>
    <Grid item md={4} xs={12}>
      {isAuth ? <Profile /> : <LoginNotification />}
    </Grid>
  </Grid>
}

const mapStateToProps = state => {
  return {
    postsList: state.PostsListReducer,
    userInfo: getUserInfo(state)
  }
}

export default connect(mapStateToProps, { loadPostList, deletePost })(PostsList)