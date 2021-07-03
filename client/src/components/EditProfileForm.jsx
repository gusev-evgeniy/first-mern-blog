import { Button, DialogActions, DialogContent, makeStyles, TextField } from '@material-ui/core'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { updateUser } from 'store/ducks/User/UserReducer'

const useStyles = makeStyles(() => ({
  form: {
    marginBottom: 20
  }
}));

export const EditProfileForm = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { handleSubmit, control } = useForm()

  const onSubmit = (formData) => {
    dispatch(updateUser(formData))
  }

  return <form onSubmit={handleSubmit(onSubmit)}>
    <DialogContent>
      <div>
        <Controller
          defaultValue=''
          name="bio"
          control={control}
          render={({ onChange, value }) => <TextField
            className={classes.form}
            onChange={onChange}
            value={value}
            label="Bio"
            multiline
            rows="3"
            placeholder="A short bio about yourself"
            fullWidth
          />}
        />
      </div>
      <div>
        <Controller
          defaultValue=''
          name="website"
          control={control}
          render={({ onChange, value }) => <TextField
            className={classes.form}
            onChange={onChange}
            value={value}
            label="Website"
            placeholder="Your personal/professinal website"
            fullWidth
          />}
        />
      </div>
      <div>
        <Controller
          defaultValue=''
          name="location"
          control={control}
          render={({ onChange, value }) => <TextField
            className={classes.form}
            onChange={onChange}
            value={value}
            label="Location"
            placeholder="Where you live"
            fullWidth
          />}
        />
      </div>

    </DialogContent>
    <DialogActions>
      <Button type='submit' color="primary">
        Save
      </Button>
    </DialogActions>
  </form>
}

