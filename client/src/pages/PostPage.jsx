import { Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import {cleanPost, loadPost} from 'store/ducks/PostDetail/PostDetailReducer'
import { isAuthInfo, postDetail } from 'store/selectors/Selectors'
import { CommentsSection } from '../components/Post/Comments/CommentsSection'
import Post from '../components/Post/Post'

const PostPage = ({ match }) => {
  const postData = useSelector(state => postDetail(state))
  const isAuth = useSelector(state => isAuthInfo(state))
  const dispatch = useDispatch()
  const postId = match.params.id

  useEffect(() => {
    dispatch(loadPost(postId))
  }, [postId, dispatch])

  if (!isAuth) {
    return <Redirect to="/login" />
  }

  return <Grid container spacing={2}>
    <Grid item sm={7} xs={12}>
      <Post postData={postData} postId={postId} />
    </Grid>
    <Grid item sm={5} xs={12}>
      <CommentsSection postId={postId} commentsInfo={postData.comments} />
    </Grid>
  </Grid>
}

export default withRouter(PostPage)