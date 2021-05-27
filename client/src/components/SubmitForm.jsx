import { Avatar, Button, IconButton, makeStyles, TextField } from '@material-ui/core'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo, loadDefaultImage } from 'store/selectors/Selectors'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import { addNewPost } from 'store/ducks/PostsList/PostsListReducer'

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    textAlign: 'center',
    alignItems: 'start',
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
    margin: theme.spacing(1.2),
    borderRadius: 9999,
    fontWeight: 600,
    textTransform: 'capitalize'
  },
  formFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: 50
  },
  formAvatar: {
    width: theme.spacing(6.5),
    height: theme.spacing(6.5),
    marginRight: 15,
  },
  formInput: {
    border: 0,
    marginTop: theme.spacing(1.4),
    width: '100%',
    fontSize: 20,
    resize: 'none',
    fontWeight: 600,
    fontFamily: 'inherit',
    color: '#5b7083',
    outline: 'none',
    '&::placeholder': {
      color: '#5b7083',
    }
  },
  icon: {
    height: 48,
    width: 48
  }
}));


export const SubmitForm = () => {
  const classes = useStyles()
  const user = useSelector(state => getUserInfo(state))
  const defaultUserImage = useSelector(state => loadDefaultImage(state))
  const dispatch = useDispatch()

  const { handleSubmit, control, register, formState: { isDirty } } = useForm()

  const handelSubmit = ({ body, image }) => {
    dispatch(addNewPost({ body, image: image[0] }))

    // history.push('/main')
  }

  const handleError = (errors) => {
    console.log(errors)
  }

  const registerOptions = {
    body: { required: "Body is required" }
  }

  return <form onSubmit={handleSubmit(handelSubmit, handleError)} >
    <div className={classes.form}>
      <Avatar src={user.photo ? `data:${user.photo.contentType};base64, ${user.photo.imageBase64}` : defaultUserImage} className={classes.formAvatar} alt={`Аватарка пользователя`} />
      <Controller
        name='body'
        control={control}
        rules={registerOptions.body}
        render={({ onChange, value }) => <TextareaAutosize
          className={classes.formInput}
          placeholder="What's happening?"
          onChange={onChange} value={value}
          rowsMax={20} />}
      />
    </div>
    <div className={classes.formFooter}>
      <IconButton
        component="label"
        color='primary'
        className={classes.icon}
      >
        <ImageOutlinedIcon style={{ fontSize: 24 }} />

        <input type="file" hidden='hidden' name='image' ref={register} />
      </IconButton>
      <Button className={classes.button} type='submit' variant='contained' color='primary' disabled={!isDirty}>
        Tweet
      </Button>
    </div>
  </form >
}
