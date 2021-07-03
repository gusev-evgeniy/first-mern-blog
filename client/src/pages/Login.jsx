import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/ducks/User/UserReducer'
import { Button, Card, Typography } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import { isAuthInfo, isFetchingInfo, showError } from 'store/selectors/Selectors'

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
  },
  error: {
    marginBottom: 20
  }
}));

export const Login = () => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const isAuth = useSelector(isAuthInfo)
  const { loginError } = useSelector(showError)
  const isFetching = useSelector(isFetchingInfo)

  const { handleSubmit, control, formState: { errors } } = useForm()

  const handleRegistration = ({ email, password }) => {
    dispatch(login(email, password))
  }

  const handleError = (errors) => {
    console.log(errors)
  }

  if (isAuth) {
    return <Redirect to='/home' />
  }

  const registerOptions = {
    email: { required: "Email is required" },
    password: { required: "Password is required" }
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
      <Typography variant="h2">
        Login
      </Typography>
      {showInputForm({ name: 'email', rules: registerOptions.email, type: 'text' })}
      {showInputForm({ name: 'password', rules: registerOptions.password, type: 'password' })}
      {loginError && <div>
        <Typography component="p" color="secondary" className={classes.error}>
          {loginError}
        </Typography>
      </div>}
      <Button type='submit' variant='contained' color='primary' disabled={!!isFetching}>
        Submit
      </Button>
    </form>
  </Card>
}
