import { Button, makeStyles, TextField } from '@material-ui/core'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { addNewPost, sendPostImage } from 'store/ducks/PostsList/PostsListReducer'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '10% auto',
    padding: 25
  },
  form: {
    textAlign: 'center',
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      minWidth: 500
    }
  },
  buttonWrapper: {
    width: '100%',
    justifyContent: 'center'
  },
  button: {
    maxWidth: 225,
    padding: '7px 15px',
    margin: theme.spacing(1),
    borderRadius: 9999
  },
}));


export const ReplyForm = ({ replyPostId }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const { handleSubmit, control, formState: { errors, isDirty } } = useForm()

  const handelSubmit = ({ body, tags }) => {
    console.log({ body, tags, replyPostId })
    dispatch(addNewPost({ body, tags, replyPostId }))

    // history.push('/main')
  }

  const handleError = (errors) => {
    console.log(errors)
  }

  const registerOptions = {
    body: { required: "Body is required" }
  }

  const showInputForm = (params) => {
    const { name, type, rules, isMultiline } = params
    return <div>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={rules}
        render={({ onChange, value }) => <TextField
          error={!!errors[name]}
          helperText={!!errors[name] && errors[name].message}
          onChange={onChange} value={value}
          label={name}
          multiline={isMultiline}
          type={type}
          variant="outlined" />}
      />
    </div>
  }

  return <form className={classes.form} onSubmit={handleSubmit(handelSubmit, handleError)} >
    {showInputForm({ name: 'body', rules: registerOptions.body, type: 'text', isMultiline: true })}
    <div className={classes.buttonWrapper}>
      <Button className={classes.button} type='submit' variant='contained' color='primary' disabled={!isDirty}>
        Submit
      </Button>
    </div>
  </form >
}
