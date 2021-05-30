import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import RepostIcon from '@material-ui/icons/RepeatOutlined';
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import { useDispatch, useSelector } from 'react-redux';
import { loadDefaultImage } from '../store/selectors/Selectors';
import { ModalBlock } from '../components/ModalBlock'

import CommentIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import LikeIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { ReplyForm } from './ReplyForm'
import { DeleteNotification } from './DeleteNotification'
import { addNewPost } from 'store/ducks/PostsList/PostsListReducer'
import { sendComment } from 'store/ducks/PostDetail/PostDetailReducer'
import { ReplyTweet } from './ReplyTweet'
import { requestSearchPosts } from 'store/ducks/Search/SearchReducer'

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
    transition: 'all 0.2s',
    '&:hover': {
      transform: 'scale(1.1)',
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
  tweetFooter: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'space-between',
  },
  tweetIcon: {
    marginRight: 50,
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
  likesCount: {
    fontSize: 16,
    marginLeft: 5
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
  const [visibleModalWindow, setVisibleModalWindow] = React.useState('');

  const handleClickOpenWindow = (modalName) => {
    setVisibleModalWindow(modalName);
  };

  const onCloseWindow = () => {
    setVisibleModalWindow(null)
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
          <div>
            <span className={classes.tweetUserName} onClick={onProfileLink}>{postData.author.name}</span>&nbsp;
            <span className={classes.tweetDate} onClick={onProfileLink}>@{postData.author.name}</span>&nbsp;
              <span className={classes.tweetDate}>·</span>&nbsp;
              <span className={classes.tweetDate}>1ч назад</span>
          </div>
        </div>
        <a onClick={onTweetLink} >
          <Typography variant="body1" gutterBottom>
            {postData.body
              .split(' ')
              .map(part =>
                part.startsWith('#') && part.length > 1
                  ? <a className={classes.tagLink} onClick={() => handelClick(part)}>{part + " "}</a>
                  : part + " "
              )}
            {postData.image && (
              <div className={classes.imageWrapper}>
                <img className={classes.tweetImage} src={`data:${postData.image.contentType};base64, ${postData.image.imageBase64}`} alt="img in twet" />
              </div>
            )}
            {postData.reply && (
              <a onClick={onReplyLink}>
                <div className={classes.replyWrapper}>
                  <ReplyTweet data={postData.reply} defaultUserImage={defaultUserImage} />
                </div>
              </a>
            )}
          </Typography>
        </a>
        <div className={classes.tweetFooter}>
          <div className={classes.tweetIcon} >
            <IconButton color='primary' >
              <LikeIcon style={{ fontSize: 20 }} />
              <span className={classes.likesCount}>{postData.likes.length}</span>
            </IconButton>
          </div>
          <div className={classes.tweetIcon}>
            <IconButton color='primary' onClick={() => handleClickOpenWindow('RepostBlock')}>
              <RepostIcon style={{ fontSize: 20 }} />
            </IconButton>
          </div>
          <div className={classes.tweetIcon} onClick={() => handleClickOpenWindow('CommentBlock')}>
            <IconButton color='primary'>
              <CommentIcon style={{ fontSize: 20 }} />
            </IconButton>
          </div>
          {postData.author._id === userId && <div className={classes.tweetIcon} onClick={() => handleClickOpenWindow('DeleteBlock')}>
            <IconButton color='secondary' >
              <DeleteOutline color="secondary" />
            </IconButton>
          </div>}
        </div>
      </div>
    </div>
    <ModalBlock onClose={onCloseWindow} visible={visibleModalWindow === 'RepostBlock'}>
      <div style={{ maxWidth: 550 }}>
        <ReplyForm func={addNewPost} replyPostId={postData._id} />
      </div>
    </ModalBlock>
    <ModalBlock onClose={onCloseWindow} visible={visibleModalWindow === 'CommentBlock'}>
      <div style={{ maxWidth: 550 }}>
        <ReplyForm func={sendComment} replyPostId={postData._id} />
      </div>
    </ModalBlock>
    <ModalBlock onClose={onCloseWindow} visible={visibleModalWindow === 'DeleteBlock'}>
      <div style={{ maxWidth: 280 }}>
        <DeleteNotification postId={postData._id} onClose={onCloseWindow} />
      </div>
    </ModalBlock>
  </>
}