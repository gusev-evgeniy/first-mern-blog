import { Avatar, CircularProgress, Divider, Grid, IconButton, LinearProgress, makeStyles, Paper, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { changeIsLoading, deleteLike, fetchData, loadPost, sendLike } from 'store/ducks/PostDetail/PostDetailReducer'
import { getPostDetail, getPostDetailStatus, getUserInfo, isAuthInfo, loadDefaultImage } from 'store/selectors/Selectors'
import CommentIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import RepostIcon from '@material-ui/icons/RepeatOutlined';
import LikeIcon from '@material-ui/icons/FavoriteBorderOutlined';

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
    paddingBottom: 0,
    maxWidth: 600,
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
  fullTweetFooter: {
    margin: '0 auto',
    borderTop: '1px solid #E6ECF0',
    left: 0,
    maxWidth: '100%',
    justifyContent: 'space-around',
    padding: '2px 0',
    marginTop: 20,
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
  postImage: {
    marginTop: 15,
    width: '100%',
    height: '100%',
    borderRadius: 15,
    objectFit: 'contain'
  }
}))

const FullPost = ({ match }) => {
  const classes = useStyles()
  const postData = useSelector(state => getPostDetail(state))
  const isLoading = useSelector(state => getPostDetailStatus(state))
  const isAuth = useSelector(state => isAuthInfo(state))
  const defaultUserImage = useSelector(state => loadDefaultImage(state))
  const dispatch = useDispatch()
  const postId = match.params.id

  useEffect(() => {
    dispatch(loadPost(postId))
  }, [postId, dispatch])

  useEffect(() => {
    return (() => {
      dispatch(changeIsLoading(true))
    })
  }, [])


  if (!isAuth) {
    return <Redirect to="/login" />
  }

  if (isLoading) {
    return <CircularProgress />
  }

  const handleSubmitLike = (postId) => {
    dispatch(sendLike(postId))
  }

  const handleDeleteLike = (postId) => {
    dispatch(deleteLike(postId))
  }

  /*const showLikeButton = () => {
    if (postData.likes.includes(userId)) {
      return returnInitialLikeButton(true, handleDeleteLike)
    } else {
      return returnInitialLikeButton(false, handleSubmitLike)
    }
  }

  const returnInitialLikeButton = (isLiked, actionFunction) => {
    return <IconButton aria-label="add to favorites" color={isLiked ? "primary" : "default"} onClick={() => actionFunction(postId, userId)}>
      <ThumbUpAltIcon />
      <span>
        {postData.likes.length}
      </span>
    </IconButton>
  }*/

  return <>
    <Paper className={classes.fullTweet}>
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
        {postData.image && <img className={classes.postImage} src={`data:${postData.image.contentType};base64, ${postData.image.imageBase64}`} alt="img in twet" />}
      </Typography>
      <Typography>
        <span className={classes.tweetUserName}>
          {postData.created}
        </span>
      </Typography>
      <div className={`${classes.tweetFooter} ${classes.fullTweetFooter}`} >
        <IconButton>
          <CommentIcon style={{ fontSize: 25 }} />
        </IconButton>
        <IconButton>
          <RepostIcon style={{ fontSize: 25 }} />
        </IconButton>
        <IconButton>
          <LikeIcon style={{ fontSize: 25 }} />
        </IconButton>
      </div>
    </Paper>
    <Divider />
    <div className={classes.tweetComments}>
      <div>comment</div>
      <div>comment</div>
      <div>comment</div>
    </div>
  </>
}

export default withRouter(FullPost)