import { Avatar, Button, Divider, IconButton, makeStyles, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo, loadDefaultImage } from 'store/selectors/Selectors'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import { addNewTweet } from 'store/ducks/AddTweet/AddTweetReducer'

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
    fontWeight: 400,

    fontFamily: 'inherit',
    color: '#7d8e9e',
    outline: 'none',
    '&::placeholder': {
      color: '#7d8e9e',
      fontWeight: 400,
    }
  },
  icon: {
    height: 48,
    width: 48
  },
  preview: {
    marginTop: 15,
    width: 100,
    maxHeight: 100,
    borderRadius: 15,
    objectFit: 'contain',
    marginLeft: 60
  },
}));


export const SubmitForm = () => {
  const classes = useStyles()
  const user = useSelector(state => getUserInfo(state))
  const defaultUserImage = useSelector(state => loadDefaultImage(state))
  const [imagePreview, setImagePreview] = useState(null)
  const dispatch = useDispatch()

  const { handleSubmit, control, register, formState: { isDirty } } = useForm()

  const handelSubmit = ({ body, image }) => {
    dispatch(addNewTweet({ body, image: image[0] }))
    setImagePreview(null)
  }

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file))
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
    {imagePreview && <img src={imagePreview} alt='preview' className={classes.preview} />}
    <div className={classes.formFooter}>
      <IconButton
        component="label"
        color='primary'
        className={classes.icon}
      >
        <ImageOutlinedIcon style={{ fontSize: 24 }} />
        <input type="file" hidden name='image' ref={register} onChange={(e) => handleChange(e)} />
      </IconButton>
      <Button
        className={classes.button}
        type='submit'
        variant='contained'
        color='primary'
        disabled={!isDirty}
      >
        Tweet
      </Button>
    </div>
  </form >
}
