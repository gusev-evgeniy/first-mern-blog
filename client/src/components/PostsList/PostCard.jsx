import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { Avatar, CardMedia, Paper } from '@material-ui/core'
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
    maxWidth: 600,
    position: 'relative',
    cursor: 'pointer',
    alignItems: 'flex-start',
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
    position: 'relative',
    top: -60,
    width: theme.spacing(6.5),
    height: theme.spacing(6.5),
    marginRight: 15,
  },
  tweetHeader: {
    display: 'flex',
    alignItems: 'center',
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
    fontWeight: 700
  },
  tweetDate: {
    color: '#818181',
  },
}))

export const PostCard = ({ postData, deletePost, userId }) => {
  const classes = useStyles()
  const defaultUserImage = useSelector(state => loadDefaultImage(state))

  dayjs.extend(relativeTime)

  const deleteHandler = () => {
    deletePost(postData._id)
  }
  const showDeleteButton = () => {
    if (postData.author._id === userId) {
      return <IconButton title="Delete Scream" className={classes.deleteButton} onClick={deleteHandler}>
        <DeleteOutline color="secondary" />
      </IconButton>
    }
  }

  return <Link to={`/main/post`}>
    <Paper className={`${classes.tweet} ${classes.tweetHeader}`} variant="outlined">
      <Avatar className={classes.tweetAvatar} alt={`Аватарка пользователя`} />
      <div className={classes.tweetContent}>
        <div className={classes.tweetHeader}>
          <div>
            <span className={classes.tweetUserName}>John</span>&nbsp;
              <span className={classes.tweetDate}>·</span>&nbsp;
              <span className={classes.tweetDate}>1ч назад</span>
          </div>
        </div>
        <Typography variant="body1" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque eveniet explicabo quos reiciendis, architecto quas itaque dignissimos dolorem, voluptatibus accusamus porro consequatur. Voluptates consequatur aperiam corporis unde amet, rem eius.
            {/* {images && <ImageList classes={classes} images={images} />} */}
        </Typography>
        <div className={classes.tweetFooter}>
          <div className={classes.tweetIcon}>
            <IconButton>
              <LikeIcon style={{ fontSize: 20 }} />
            </IconButton>
            <span>1</span>
          </div>
          {/* <div>
            <IconButton>
              <RepostIcon style={{ fontSize: 20 }} />
            </IconButton>
          </div> */}
          <div className={classes.tweetIcon}>
            <IconButton>
              <CommentIcon style={{ fontSize: 20 }} />
            </IconButton>
          </div>
          {/* <div>
            <IconButton>
              <ShareIcon style={{ fontSize: 20 }} />
            </IconButton>
          </div> */}
        </div>
      </div>
    </Paper>
  </Link>
}
