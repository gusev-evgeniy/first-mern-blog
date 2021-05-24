import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { Avatar, Paper } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import RepostIcon from '@material-ui/icons/RepeatOutlined';
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import { useSelector } from 'react-redux';
import { loadDefaultImage } from '../store/selectors/Selectors';
import { ModalBlock } from '../components/ModalBlock'

import CommentIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import LikeIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { ReplyForm } from './ReplyForm'

const useStyles = makeStyles((theme) => ({
  tweet: {
    display: 'flex',
    position: 'relative',
    cursor: 'pointer',
    justifyContent: 'column',
    alignItems: 'flex-end',
    padding: '15px 15px 0 15px',
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
  },
  tweetHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  tweetContent: {
    flex: 1,
  },
  tweetFooter: {
    display: 'flex',
    position: 'relative',
    left: -13,
    justifyContent: 'start',
    maxWidth: 450,
  },
  tweetIcon: {
    marginRight: 50,
  },
  tweetUserName: {
    color: '#00bcd4',
    fontWeight: 600,
    fontSize: 19
  },
  tweetDate: {
    color: '#818181',
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
    maxWidth: 505,
    height: 285,
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
    border: '1px solid #818181',
    borderRadius: 15
  },
}))

export const PostCard = ({ postData, handleDeletePost, userId }) => {
  const classes = useStyles()
  const defaultUserImage = useSelector(state => loadDefaultImage(state))
  const [visibleReplyOnTweet, setVisibleReplyOnTweet] = React.useState(false);

  const handleClickOpenReplyOnTweet = () => {
    setVisibleReplyOnTweet(true);
  };

  const onCloseReplyOnTweet = () => {
    setVisibleReplyOnTweet(false);
  };

  const showDeleteButton = () => {
    if (postData.author._id === userId) {
      return <IconButton title="Delete Scream" className={classes.deleteButton} onClick={() => { handleDeletePost(postData._id) }}>
        <DeleteOutline color="secondary" />
      </IconButton>
    }
  }

  const str = `hello world #jjlkj`

  const changeColor = (value) => {
    return (
      <span>
        <span style={{ color: "red" }}>{value}</span>
      </span>
    )
  }

  return <Link to={`/main/post/${postData._id}`}>
    <Paper className={`${classes.tweet} ${classes.tweetHeader}`} variant="outlined">
      <Avatar src={postData.author.photo ? `data:${postData.author.photo.contentType};base64, ${postData.author.photo.imageBase64}` : defaultUserImage} className={classes.tweetAvatar} alt={`Аватарка пользователя`} />
      <div className={classes.tweetContent}>
        <div className={classes.tweetHeader}>
          <div>
            <span className={classes.tweetUserName}>{postData.author.name}</span>&nbsp;
              <span className={classes.tweetDate}>·</span>&nbsp;
              <span className={classes.tweetDate}>1ч назад</span>
          </div>
        </div>
        <Typography variant="body1" gutterBottom>
          {postData.body.split(' ').map(part =>
            part.startsWith('#') && part.length > 1 ? <Link className={classes.tagLink} to='/sdfsd'>{part + " "}</Link> : part + " "
          )}
          {postData.image && <div className={classes.imageWrapper}>
            <img className={classes.tweetImage} src={`data:${postData.image.contentType};base64, ${postData.image.imageBase64}`} alt="img in twet" />
          </div>}
          {postData.reply && <div className={classes.replyWrapper}>
            <p>{postData.reply.author.name}</p>
            <Avatar src={postData.reply.author.photo ? `data:${postData.reply.author.contentType};base64, ${postData.reply.author.imageBase64}` : defaultUserImage} className={classes.tweetAvatar} alt={`Аватарка пользователя`} />
            <div>
              {postData.reply.body}
            </div>
          </div>}
        </Typography>
        <div className={classes.tweetFooter}>
          <div className={classes.tweetIcon} >
            <IconButton color='secondary' >
              <LikeIcon style={{ fontSize: 20 }} />
              <span className={classes.likesCount}>{postData.likes.length}</span>
            </IconButton>
          </div>
          <div className={classes.tweetIcon}>
            <IconButton color='primary' onClick={handleClickOpenReplyOnTweet}>
              <RepostIcon style={{ fontSize: 20 }} />
            </IconButton>
            <ModalBlock onClose={onCloseReplyOnTweet} visible={visibleReplyOnTweet}>
              <div style={{ maxWidth: 550 }}>
                <ReplyForm replyPostId={postData._id} />
              </div>
            </ModalBlock>
          </div>
          <div className={classes.tweetIcon}>
            <IconButton color='primary'>
              <CommentIcon style={{ fontSize: 20 }} />
            </IconButton>
          </div>
        </div>
      </div>
    </Paper>
  </Link>
}
