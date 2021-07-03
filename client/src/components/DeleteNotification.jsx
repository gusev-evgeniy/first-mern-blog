import { Button, makeStyles } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { deletePost } from 'store/ducks/PostsList/PostsListReducer'

const useStyles = makeStyles((theme) => ({
  deleteNotificationWrapper: {
    textAlign: 'center'
  },
  deleteNotificationHeader: {
    fontSize: 20,
    color: '#0F1419'
  },
  deleteNotificationBody: {
    color: '#0F1419',
    fontSize: 16,
    fontWeight: 700
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    margin: '30px 10px 20px 10px',
    borderRadius: 9999,
    width: 110,
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
  }
}))

export const DeleteNotification = ({ postId, onClose }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(deletePost(postId))
  }

  return <div className={classes.deleteNotificationWrapper}>
    <div className={classes.deleteNotificationBody}>
      Are you sure you want to delete this tweet?
    </div>
    <div className={classes.buttonsWrapper}>
      <Button className={classes.button} variant="contained" color="primary" onClick={onClose}>Cancel</Button>
      <Button className={classes.button} variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
    </div>
  </div>
}
