import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, makeStyles, LinearProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { isFetchingInfo } from 'store/selectors/Selectors'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: '#FFF'
  }
}));

export const Navbar = () => {
  const classes = useStyles()

  const isFetching = useSelector(state => isFetchingInfo(state))

  return <AppBar position="fixed">
    <Toolbar >
      <Typography variant="h6" className={classes.title}>
        <Button color="inherit" component={Link} to='/main'>
          Post List
        </Button>
        <Button color="inherit" component={Link} to='/new-post'>
          New Post
        </Button>
      </Typography>
    </Toolbar>
    {isFetching && <LinearProgress />}
  </AppBar>
}