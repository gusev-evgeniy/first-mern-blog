import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo } from '../store/selectors/Selectors'
import { deleteLike, sendLike } from '../store/ducks/PostDetail/PostDetailReducer'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

import CommentIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import RepostIcon from '@material-ui/icons/RepeatOutlined';
import LikeIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ShareIcon from '@material-ui/icons/ReplyOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { Avatar, Divider, IconButton, Menu, MenuItem, Paper, Typography } from '@material-ui/core';
import { PostCard } from 'components/PostsList/PostCard'

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
  }
}))

const FullPost = ({ postData, postId }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { _id: userId } = useSelector(state => getUserInfo(state))

  dayjs.extend(relativeTime)

  const handleSubmitLike = (postId) => {
    dispatch(sendLike(postId))
  }

  const handleDeleteLike = (postId) => {
    dispatch(deleteLike(postId))
  }

  const showLikeButton = () => {
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
  }

  return (
    <>
      <Paper className={classes.fullTweet}>
        <div className={classes.tweetsHeaderUser}>
          <Avatar
            className={classes.tweetAvatar}
            alt={`Аватарка пользователя `}
          />
          <Typography>
          <b>John Smith</b>&nbsp;
            <div>
              <span className={classes.tweetUserName}>@John</span>&nbsp;
              </div>
          </Typography>
        </div>
        <Typography className={classes.fullTweetText} gutterBottom>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo, cumque mollitia adipisci sed neque maxime aperiam delectus quis sunt quidem blanditiis doloribus reiciendis aliquam unde error libero commodi similique voluptatum?
         
        </Typography>
        <Typography>
          <span className={classes.tweetUserName}>
           
          </span>
          <span className={classes.tweetUserName}>
            1ч
          </span>
        </Typography>
        <div  className={`${classes.tweetFooter} ${classes.fullTweetFooter}`} >
          <IconButton>
            <CommentIcon style={{ fontSize: 25 }} />
          </IconButton>
          <IconButton>
            <RepostIcon style={{ fontSize: 25 }} />
          </IconButton>
          <IconButton>
            <LikeIcon style={{ fontSize: 25 }} />
          </IconButton>
          <IconButton>
            <ShareIcon style={{ fontSize: 25 }} />
          </IconButton>
        </div>
      </Paper>
      <Divider />
     <div className={classes.tweetComments}>
     <PostCard postData={'_id: 1'}/>
      <PostCard postData={'_id:2'}/>
      <PostCard postData={'_id:3'}/>
     </div>
    </>
  )
}

export default FullPost