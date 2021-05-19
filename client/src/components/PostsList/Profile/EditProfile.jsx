import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, TextField } from '@material-ui/core'
import React from 'react'
import MyButton from './../../../utils/MyButton'
import EditIcon from '@material-ui/icons/Edit'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { updateUser } from 'store/ducks/User/UserReducer'

const useStyles = makeStyles(() => ({
  form: {
    marginBottom: 20
  }
}));

export const EditProfile = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const { handleSubmit, control } = useForm()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = (formData) => {
    dispatch(updateUser(formData))
    setOpen(false)
  }


  return <>
    <MyButton
      tip="Edit Details"
      onClick={handleClickOpen}
    >
      <EditIcon color="primary" />
    </MyButton>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth
      maxWidth="sm">
      <DialogTitle id="form-dialog-title">Edit your details</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <Button color="primary" onClick={handleClose}>
            Cancel
            </Button>
          <Button type='submit' color="primary">
            Save
            </Button>
        </DialogActions>
      </form>
    </Dialog>
  </>
}

