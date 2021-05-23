import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { Avatar, Paper } from '@material-ui/core'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import IconButton from '@material-ui/core/IconButton'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import { useSelector } from 'react-redux';
import { loadDefaultImage } from '../../store/selectors/Selectors';

import CommentIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import LikeIcon from '@material-ui/icons/FavoriteBorderOutlined';

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
    color: 'red'
  },
  imageWrapper: {
    maxWidth: 505,
    height: 285,
    overflow: 'hidden',
    marginTop: 15,
    borderRadius: 15
  },
  tweetImage: {
    maxWidth: '100%',
    maWheight: '100%',
    objectFit: 'cover'
  }
}))

export const PostCard = ({ postData, handleDeletePost, userId }) => {
  const classes = useStyles()
  const defaultUserImage = useSelector(state => loadDefaultImage(state))

  const showDeleteButton = () => {
    if (postData.author._id === userId) {
      return <IconButton title="Delete Scream" className={classes.deleteButton} onClick={() => { handleDeletePost(postData._id) }}>
        <DeleteOutline color="secondary" />
      </IconButton>
    }
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
          {postData.body}
          <div className={classes.imageWrapper}>
            <img className={classes.tweetImage} src="https://images.squarespace-cdn.com/content/v1/52c9d908e4b0e87887310693/1570977177233-3MLE72XBCVKG0S2Y8DS5/ke17ZwdGBToddI8pDm48kPJa756O6kWVkUAihwdWcdF7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmFrKkuyfqIWRdt3lCufLMASBAVeBlkctbW4J4Fmip5HIl_Q1aajChv3WX3kxF93Eb/spiderman-into-spider-verse-5k-7b-2048x2048-1020x1020.jpg" alt="img in twet" />
          </div>
          {/* {images && <ImageList classes={classes} images={images} />} */}
        </Typography>
        <div className={classes.tweetFooter}>
          <div className={classes.tweetIcon}>
            <IconButton color='secondary'>
              <LikeIcon style={{ fontSize: 20 }} />
              <span className={classes.likesCount}>{postData.likes.length}</span>
            </IconButton>
          </div>
          {/* <div>
            <IconButton>
              <RepostIcon style={{ fontSize: 20 }} />
            </IconButton>
          </div> */}
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
