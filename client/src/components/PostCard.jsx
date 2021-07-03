import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import { useDispatch, useSelector } from 'react-redux';
import { loadDefaultImage } from '../store/selectors/Selectors';
import { ModalBlock } from '../components/ModalBlock'
import relativeTime from 'dayjs/plugin/relativeTime'
import * as dayjs from 'dayjs'

import { DeleteNotification } from './DeleteNotification'
import { ReplyTweet } from './ReplyTweet'
import { requestSearchPosts } from 'store/ducks/Search/SearchReducer'
import { TweetFooter } from './TweetFooter'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  tweet: {
    display: 'flex',
    position: 'relative',
    cursor: 'pointer',
    justifyContent: 'column',
    alignItems: 'flex-end',
    padding: '15px 15px 0 15px',
    borderBottom: '1px solid  #EBEEF0',
    '&:hover': {
      backgroundColor: 'rgb(245, 248, 250)',
    },
  },
  tweetWrapper: {
    color: 'inherit',
    textDecoration: 'none',
  },
  tweetAvatar: {
    width: theme.spacing(6.5),
    height: theme.spacing(6.5),
    marginRight: 15,
    transition: 'all 0.3s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  tweetHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  tweetContent: {
    flex: 1,
  },
  tweetUserName: {
    fontWeight: 600,
    fontSize: 19,
    '&:hover': {
      borderBottom: '1px solid #000'
    },
  },
  tweetDate: {
    fontSize: 17,
    color: '#818181',
    '&:hover': {
      borderBottom: '1px solid #818181'
    },
  },
  tagLink: {
    color: '#00bcd4',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  imageWrapper: {
    width: '90%',
    maxHeight: 285,
    overflow: 'hidden',
    marginTop: 15,
    borderRadius: 15
  },
  tweetImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  replyWrapper: {
    position: 'relative',
    border: '1px solid #C4CFD6',
    borderRadius: 15,
    overflow: 'hidden'
  }
}))

export const PostCard = ({ postData, userId }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const defaultUserImage = useSelector(state => loadDefaultImage(state))
  const [deleteWindow, setDeleteWindow] = useState(false)
  dayjs.extend(relativeTime)

  const handleOpenDeleteWindow = () => {
    setDeleteWindow(true)
  }

  const handleCloseDeleteWindow = () => {
    setDeleteWindow(false)
  }

  const handelClick = (tag) => {
    history.push({
      pathname: '/home/search',
      search: `?q=${tag}`,
      state: {
        quary: tag,
      },
    })
    dispatch(requestSearchPosts(tag))
  }

  const onTweetLink = (e) => {
    history.push(`/home/post/${postData._id}`)
  }

  const onReplyLink = (e) => {
    e.stopPropagation()
    e.preventDefault()

    history.push(`/home/post/${postData.reply._id}`)
  }

  const onProfileLink = (e) => {
    history.push(`/home/user/${postData.author._id}`)
  }


  return <>
    <div className={`${classes.tweet} ${classes.tweetHeader}`} variant="outlined">
      <Avatar
        src={postData.author && postData.author.photo
          ? `data:${postData.author.photo.contentType};base64, ${postData.author.photo.imageBase64}`
          : defaultUserImage}
        className={classes.tweetAvatar}
        alt={`Аватарка пользователя`}
        onClick={onProfileLink}
      />
      <div className={classes.tweetContent}>
        <div className={classes.tweetHeader}>
          <div >
            <span className={classes.tweetUserName} onClick={onProfileLink}>{postData.author.name}</span>&nbsp;
            <span className={classes.tweetDate} onClick={onProfileLink}>@{postData.author.name}</span>&nbsp;
            <span className={classes.tweetDate}>·</span>&nbsp;
            <span className={classes.tweetDate}>{dayjs(postData.created).fromNow()}</span>
          </div>
          {postData.author._id === userId && <div onClick={handleOpenDeleteWindow}>
            <IconButton color='secondary' >
              <DeleteOutline color="secondary" />
            </IconButton>
          </div>}
        </div>
        <div onClick={onTweetLink} >
          <Typography variant="body1" gutterBottom>
            {postData.body
              .split(' ')
              .map(part =>
                part.startsWith('#') && part.length > 1
                  ? <span className={classes.tagLink} onClick={() => handelClick(part)}>{part + " "}</span>
                  : part + " "
              )}
            {postData.image && (
              <div className={classes.imageWrapper}>
                <img className={classes.tweetImage} src={`data:${postData.image.contentType};base64, ${postData.image.imageBase64}`} alt="img in twet" />
              </div>
            )}
            {postData.reply && (
              <div onClick={onReplyLink}>
                <div className={classes.replyWrapper}>
                  <ReplyTweet data={postData.reply} defaultUserImage={defaultUserImage} />
                </div>
              </div>
            )}
          </Typography>
        </div>
        <TweetFooter
          postData={postData}
          userId={userId}
        />
        <ModalBlock onClose={handleCloseDeleteWindow} title={'Delete'} visible={deleteWindow}>
          <div style={{ maxWidth: 280 }}>
            <DeleteNotification postId={postData._id} onClose={handleCloseDeleteWindow} />
          </div>
        </ModalBlock>
      </div>
    </div>
  </>
}