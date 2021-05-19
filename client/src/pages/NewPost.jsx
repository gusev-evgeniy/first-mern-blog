import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { Button, Card, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { isAuthInfo } from 'store/selectors/Selectors'
import { addNewPost } from 'store/ducks/PostsList/PostsListReducer'
import { Redirect, useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    margin: '10% auto',
    padding: 25
  },
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      minWidth: 350
    }
  },
  button: {
    marginTop: '20px'
  }
}));

const NewPost = () => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const history = useHistory()
  const isAuth = useSelector(state => isAuthInfo(state))

  const { handleSubmit, control, formState: { errors } } = useForm()

  if (!isAuth) {
    return <Redirect to='/posts-list' />
  }

  const handleRegistration = (data) => {
    dispatch(addNewPost(data))

    history.push('/posts-list')
  }

  const handleError = (errors) => {
    console.log(errors)
  }

  const registerOptions = {
    title: { required: "Title is required" },
    body: { required: "Body is required" }
  }

  const showInputForm = (params) => {
    const { name, type, rules } = params
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
          type={type}
          variant="outlined" />}
      />
    </div>
  }

  return <Card className={classes.root}>
    <form className={classes.form} onSubmit={handleSubmit(handleRegistration, handleError)}>
      <Typography variant="h4">
        New Post
      </Typography>
      {showInputForm({ name: 'title', rules: registerOptions.title, type: 'text' })}
      {showInputForm({ name: 'body', rules: registerOptions.body, type: 'text' })}
      <Button type='submit' variant='contained' color='primary'>
        Submit
      </Button>
    </form>
  </Card>


  // const { handleSubmit, control } = useForm()
  // const history = useHistory()

  // const { _id, fullName } = useSelector(state => getUserInfo(state))
  // const isAuth = useSelector(state => isAuthInfo(state))

  // const onSubmit = (formDate) => {
  //   const newPostData = { ...formDate, authorId: _id, authorName: fullName }
  //   dispatch(addNewPost(newPostData))

  //   history.push('/posts-list')
  // }

  // if (!isAuth) {
  //   return <Redirect to="/login" />
  // }

  // return <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
  //   <Typography variant="h3">
  //     New Post
  //     </Typography>
  //   <div>
  //     <Controller
  //       name="title"
  //       control={control}
  //       defaultValue=""
  //       render={({ onChange, value }) => <TextField
  //         onChange={onChange} value={value}
  //         label="title"
  //         variant="outlined" />}
  //     />
  //   </div>
  //   <div>
  //     <Controller
  //       name="body"
  //       control={control}
  //       defaultValue=""
  //       render={({ onChange, value }) => <TextField
  //         onChange={onChange} value={value}
  //         multiline
  //         label="body"
  //         variant="outlined" />}
  //     />
  //   </div>
  //   <Button type='submit' variant='contained' color='primary'>
  //     Submit
  //     </Button>
  // </form>
}
export default NewPost