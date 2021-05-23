import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, makeStyles, LinearProgress } from '@material-ui/core'
import { isFetchingInfo } from 'store/selectors/Selectors'
import { useSelector } from 'react-redux';


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
          Main
        </Button>
        <Button color="inherit" component={Link} to='/main/search'>
          Search
        </Button>
      </Typography>
    </Toolbar>
    {isFetching && <LinearProgress />}
  </AppBar>
}