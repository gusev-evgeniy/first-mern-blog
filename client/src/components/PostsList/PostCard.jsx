import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { CardMedia } from '@material-ui/core'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import IconButton from '@material-ui/core/IconButton'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import {useSelector} from 'react-redux';
import {loadDefaultImage} from '../../store/selectors/Selectors';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    position: 'relative'
  },
  image: {
    maxWidth: 140,
    objectFit: 'cover'
  },
  content: {
    padding: '10px 25px',
    textAlign: 'left',
    lineHeight: '2.5rem'
  },
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10%'
  }
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

  return <Card className={classes.card}>
    <CardMedia className={classes.image} component="img"
      alt="Contemplative Reptile"
      src={postData.author?.photo ? `data:${postData.author.photo.contentType};base64, ${postData.author.photo.imageBase64}` : defaultUserImage}
      title="user image" />
    <CardContent className={classes.content}>
      <Typography gutterBottom variant="h5" component={Link} to={`/post/${postData._id}`} color="primary">
        {postData.author.name}
      </Typography>
      {showDeleteButton()}
      <Typography variant="body2" color="textSecondary" component="p">
        {dayjs(postData.data).fromNow()}
      </Typography>
      <Typography variant="body1" component="p">
        {postData.title}
      </Typography >
      <Typography variant="body1" component="span" color="primary">
        Likes: {postData.likes.length}
      </Typography >
    </CardContent>
  </Card>
}
