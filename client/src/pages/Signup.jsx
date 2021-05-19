import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Typography } from '@material-ui/core'
import { createUser } from '../store/ducks/User/UserReducer'
import { isAuthInfo, isFetchingInfo, showError } from 'store/selectors/Selectors'
import { Redirect } from 'react-router-dom'

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
    marginTop: 20
  },
  error: {
    marginBottom: 20
  }
}));

export const Signup = () => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const isAuth = useSelector(state => isAuthInfo(state))
  const { registrationError } = useSelector(state => showError(state))
  const isFetching = useSelector(state => isFetchingInfo(state))

  const { handleSubmit, control, formState: { errors } } = useForm()

  if (isAuth) {
    return <Redirect to='/posts-list' />
  }

  const handleRegistration = (data) => {
    dispatch(createUser(data))
  }

  const handleError = (errors) => {
    console.log(errors)
  };

  const registerOptions = {
    name: { required: "Name is required" },
    email: { required: "Email is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters"
      }
    }
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

  return <>
    <Card className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit(handleRegistration, handleError)}>
        <Typography variant="h2">
          Sign Up
      </Typography>
        {showInputForm({ name: 'name', rules: registerOptions.name, type: 'text' })}
        {showInputForm({ name: 'email', rules: registerOptions.email, type: 'text' })}
        {showInputForm({ name: 'password', rules: registerOptions.password, type: 'password' })}
        {registrationError && <div>
          <Typography component="p" color="secondary" className={classes.error}>
            {registrationError}
          </Typography>
        </div>}
        <Button type='submit' variant='contained' color='primary' disabled={!!isFetching}>
          Submit
      </Button>
      </form>
    </Card>
  </>
}
