import Card from '@material-ui/core/Card/Card'
import CardContent from '@material-ui/core/CardContent/CardContent'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography/Typography'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import React from 'react'
import {useSelector} from 'react-redux';
import {loadDefaultImage} from '../../../store/selectors/Selectors';

const useStyles = makeStyles((theme) => ({
  commentsFiled: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  comment: {
    marginBottom: theme.spacing(2),
    textAlign: "right"
  },
  imageWrapper: {
    display: 'flex',
    maxHeight: 50,
    alignItems: 'center'
  },
  image: {
    maxWidth: 50,
    maxHeight: 50,
    margin: '0 20px 0 0',
    objectFit: 'cover',
    borderRadius: '50%',
  }
}));

export const CommentsList = ({ commentsInfo }) => {
  const classes = useStyles()
  const defaultUserImage = useSelector(state => loadDefaultImage(state) )

  dayjs.extend(relativeTime)

  return (
    <div>
      {commentsInfo.map(comment => <Card className={classes.comment} key={comment._id}>
        <CardContent >
          <div>
            <div className={classes.imageWrapper}>
              <img src={comment.author.photo ? `data:${comment.author.photo.contentType};base64, ${comment.author.photo.imageBase64}` : defaultUserImage}
                   className={classes.image} alt="profile" />
              <Typography gutterBottom variant="h5" color="primary">
                {comment.author.name}
              </Typography>
            </div>
          </div>
          <Typography variant="body2" color="textSecondary" component="p">
            {dayjs(comment.date).fromNow()}
          </Typography>
          <Typography variant="body1" component="p">
            {comment.body}
          </Typography>
        </CardContent>
      </Card>)}
    </div>
  )
}