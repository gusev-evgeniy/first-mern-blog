import { Avatar, CircularProgress, makeStyles, Paper, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { changeIsLoading, loadPost } from 'store/ducks/PostDetail/PostDetailReducer'
import { getPostDetail, getPostDetailStatus, getUserInfo, isAuthInfo, loadDefaultImage } from 'store/selectors/Selectors'
import { ReplyTweet } from 'components/ReplyTweet'
import { TweetFooter } from 'components/TweetFooter'
import * as dayjs from 'dayjs'

const useStyles = makeStyles((theme) => ({
  tweetUserName: {
    color: '#808080',
  },
  tweetsHeaderUser: {
    display: 'flex',
    alignItems: 'center',
  },
  fullTweet: {
    padding: 22,
    paddingBottom: 20,
    maxWidth: 600,
    borderBottom: '1px solid #E6ECF0',
  },
  tweetAvatar: {
    width: theme.spacing(6.5),
    height: theme.spacing(6.5),
    marginRight: 15,
  },
  fullTweetText: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,
    lineHeight: 1.3125,
    wordBreak: 'break-word',
  },
  tweetFooter: {
    display: 'flex',
    position: 'relative',
    left: -13,
    justifyContent: 'space-between',
    maxWidth: 450,
  },
  tweetComments: {
    maxHeight: 800,
    overflowY: 'scroll'
  },
  comment: {
    borderTop: '1px solid #E6ECF0'
  },
  postImage: {
    marginTop: 15,
    width: '100%',
    height: '100%',
    borderRadius: 15,
    objectFit: 'contain'
  },
  divider: {
    display: 'flex',
    flex: 1,
    height: 13,
    backgroundColor: '#f7f9fa',
  },
}))

const FullPost = ({ match }) => {
  const classes = useStyles()
  const postData = useSelector(getPostDetail)
  const isLoading = useSelector(getPostDetailStatus)
  const isAuth = useSelector(isAuthInfo)
  const { _id } = useSelector(getUserInfo)
  const defaultUserImage = useSelector(loadDefaultImage)
  const dispatch = useDispatch()
  const postId = match.params.id

  useEffect(() => {
    dispatch(loadPost(postId))
  }, [postId, dispatch])

  useEffect(() => {
    return (() => {
      dispatch(changeIsLoading(true))
    })
  }, [dispatch])


  if (!isAuth) {
    return <Redirect to="/login" />
  }

  if (isLoading) {
    return <CircularProgress />
  }

  return <Paper>
    <div className={classes.fullTweet}>
      <div className={classes.tweetsHeaderUser}>
        <Avatar src={postData.author.photo ? `data:${postData.author.photo.contentType};base64, ${postData.author.photo.imageBase64}` : defaultUserImage} className={classes.tweetAvatar} alt={`Аватарка пользователя`} />
        <Typography>
          <b>{postData.author.name}</b>&nbsp;
          <div>
            <span className={classes.tweetUserName}>@{postData.author.name}</span>&nbsp;
          </div>
        </Typography>
      </div>
      <Typography className={classes.fullTweetText} gutterBottom>
        {postData.body}
        {postData.image && <img className={classes.postImage} src={`data:${postData.image.contentType};base64, ${postData.image.imageBase64}`} alt="img in tweet" />}
      </Typography>
      <Typography>
        <span className={classes.tweetUserName}>
          {dayjs(postData.created).format('H:mm ')}
          &#183; {dayjs(postData.created).format(' DD MMM, YYYY')}
        </span>
      </Typography>
      {/* <TweetFooter postData={postData} userId={_id} /> */}
    </div>
    <div className={classes.divider}></div>
    <div className={classes.tweetComments}>
      {postData.comments.map(item => <div className={classes.comment} key={item._id} >
        <ReplyTweet data={item} defaultUserImage={defaultUserImage} />
      </div>)}
    </div>
  </Paper>
}

export default withRouter(FullPost)