import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isAuthInfo } from 'store/selectors/Selectors'
import { RightSide } from 'components/RightSide'
import { Home } from './Home';
import { Route } from 'react-router-dom';
import FullPostPage from './FullPost'
import { Search } from './Search'
import { requestTopTags } from 'store/ducks/Tags/TagReducer'
import { useEffect } from 'react'
import { SideMenu } from 'components/SideMenu'
import { Profile } from './Profile'

const useStyles = makeStyles((theme) => ({
  buttonWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  TweetButton: {
    display: 'flex',
    alignSelf: 'center',
    maxWidth: 225,
    padding: theme.spacing(1.7),
    marginTop: theme.spacing(2),
    borderRadius: 9999
  },
  middleWrapper: {
    position: 'relative',
    minHeight: '100vh',
    border: '1px solid  #EBEEF0',
  }
}))

export const Main = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestTopTags())
  }, [dispatch])

  return <Grid container>
    <Grid item md={3} sm={1} xs={12}>
      <SideMenu />
    </Grid>
    <Grid item md={6} sm={11} xs={12} className={classes.middleWrapper}>
      <Route exact path='/home'>
        <Home />
      </Route>
      <Route path='/home/post/:id'>
        <FullPostPage />
      </Route>
      <Route path='/home/search'>
        <Search />
      </Route>
      <Route path='/home/user/:id'>
        <Profile />
      </Route>
    </Grid>
    <Grid item md={3} sm={6} xs={12} >
      <div >
        <RightSide />
      </div>
    </Grid>
  </Grid>
}
