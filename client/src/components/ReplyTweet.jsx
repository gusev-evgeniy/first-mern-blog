import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { Avatar, Paper } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  tweet: {
    display: 'flex',
    position: 'relative',
    cursor: 'pointer',
    justifyContent: 'column',
    alignItems: 'flex-end',
    padding: '15px 13px',
    zIndex: 1,
    '&:hover': {
      backgroundColor: 'rgb(245, 248, 250)',
    },
  },
  tweetAvatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginRight: 15,
  },
  tweetHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    marginBottom: 10
  },
  tweetContent: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  tweetUserName: {
    fontWeight: 600,
    fontSize: 18
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
    width: '100%',
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
    border: '1px solid #818181',
    borderRadius: 15
  },
}))

export const ReplyTweet = ({ data, defaultUserImage }) => {
  const classes = useStyles()

  return <div className={classes.tweet}>
    <div className={classes.tweetContent}>
      <div className={classes.tweetHeader}>
        <Avatar src={data.author.photo ? `data:${data.author.photo.contentType};base64, ${data.author.photo.imageBase64}` : defaultUserImage} className={classes.tweetAvatar} alt={`Аватарка пользователя`} />
        <div>
          <span className={classes.tweetUserName}>{data.author.name}</span>&nbsp;
              <span className={classes.tweetDate}>·</span>&nbsp;
              <span className={classes.tweetDate}>1ч назад</span>
        </div>
      </div>
      <Typography variant="body1" gutterBottom>
        {data.body.split(' ').map(part =>
          part.startsWith('#') && part.length > 1 ? <Link className={classes.tagLink} to='/sdfsd'>{part + " "}</Link> : part + " "
        )}
        {data.image && <div className={classes.imageWrapper}>
          <img className={classes.tweetImage} src={`data:${data.image.contentType};base64, ${data.image.imageBase64}`} alt="img in twet" />
        </div>}
      </Typography>
    </div>
  </div>
}