import Button from '@material-ui/core/Button/Button'
import Card from '@material-ui/core/Card/Card'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography/Typography'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'fixed',
    padding: '20px 35px',
    maxWidth: 400,
    margin: '0 auto'
  },
  button: {
    margin: '20px 10px 0 10px'
  }
}))

export const LoginNotification = () => {
  const classes = useStyles()

  return <Card className={classes.paper}>
    <Typography variant="body2" align="center">
      No profile found, please login again
    </Typography>
    <div >
      <Button variant="contained" color="primary" component={Link} to="/login" className={classes.button} >
        Login
      </Button>
      <Button variant="contained" color="secondary" component={Link} to="/signup" className={classes.button}>
        Signup
      </Button>
    </div>
  </Card>
}
