import makeStyles from '@material-ui/core/styles/makeStyles'
import TextField from '@material-ui/core/TextField/TextField'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo } from 'store/selectors/Selectors'
import { sendComment } from '../../../store/ducks/PostDetail/PostDetailReducer'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      width: '100%',
      backgroundColor: '#fff',
      marginBottom: theme.spacing(2)
    },
  }
}));

export const CommentForm = ({ postId }) => {
  const classes = useStyles()

  const { fullName } = useSelector(state => getUserInfo(state))
  const dispatch = useDispatch()

  const { handleSubmit, control, reset } = useForm()

  const onSubmit = ({ newComment }) => {
    dispatch(sendComment({ postId, newComment, fullName }))
    reset()
  }

  return <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
    <Controller
      name="newComment"
      control={control}
      defaultValue=""
      render={({ onChange, value }) => <TextField
        onChange={onChange} value={value}
        name="newComment"
        id="filled-multiline-static"
        variant="outlined" />}
    />
  </form>
}