import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { CardActions, IconButton } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo } from '../../store/selectors/Selectors'
import { deleteLike, sendLike } from '../../store/ducks/PostDetail/PostDetailReducer'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

const useStyles = makeStyles({
  pos: {
    marginBottom: 12,
  },
});

const Post = ({ postData, postId }) => {
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

  return <Card variant="outlined">
    <CardContent>
      <Typography variant="h5" component="h2">
        {postData.title}
      </Typography>
      <Typography className={classes.pos} color="textSecondary">
        {dayjs(postData.data).fromNow()}
      </Typography>
      <Typography variant="body2" component="p">
        {postData.body}
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      {showLikeButton()}
    </CardActions>
  </Card>
}

export default Post