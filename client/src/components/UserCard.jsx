import React from 'react'
import { Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { getSubscriptionsInfo, loadDefaultImage } from 'store/selectors/Selectors'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import { subscribe, unsubscribe } from 'store/ducks/Subscribe/SubscribeReducer'

const useStyles = makeStyles((theme) => ({
  userCardWrapper: {
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
  avatar: {
    width: theme.spacing(6.5),
    height: theme.spacing(6.5),
    marginRight: 15,
    transition: 'all 0.3s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  userCardHeader: {
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

export const UserCard = ({ user, profile }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const history = useHistory()
  const defaultUserImage = useSelector(loadDefaultImage)
  const { disablingButtons } = useSelector(getSubscriptionsInfo)

  const onProfileLink = (e) => {
    history.push(`/home/user/${user._id}`)
  }

  const handleSubscribe = () => {
    dispatch(subscribe(user._id))
  }

  const handleUnsubscribe = () => {
    dispatch(unsubscribe(user._id))
  }

  const isDisabled = () => {
    return disablingButtons.includes(user._id)
  }

  return (
    <div className={`${classes.userCardWrapper} ${classes.userCardHeader}`} variant="outlined">
      <Avatar
        src={user.photo
          ? `data:${user.photo.contentType};base64, ${user.photo.imageBase64}`
          : defaultUserImage}
        className={classes.avatar}
        alt={`Аватарка пользователя`}
        onClick={onProfileLink}
      />
      <div className={classes.tweetContent}>
        <div className={classes.userCardHeader}>
          <div >
            <span className={classes.tweetUserName} onClick={onProfileLink}>{user.name}</span>&nbsp;
            <span className={classes.tweetDate} onClick={onProfileLink}>@{user.name}</span>&nbsp;
          </div>
          {profile.subscriptions && profile.subscriptions.includes(user._id)
            ? <Button disabled={isDisabled()} onClick={handleUnsubscribe}>Unfollow</Button>
            : <Button disabled={isDisabled()} onClick={handleSubscribe}>Follow</Button>}
        </div>
        <Typography variant="body1" gutterBottom>
          {user.bio}
        </Typography>
      </div>
    </div>
  )
}
