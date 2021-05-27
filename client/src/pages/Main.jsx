import { Button, Grid, Hidden, makeStyles } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isAuthInfo } from 'store/selectors/Selectors'
import { LoginNotification } from '../components/Profile/LoginNotification'
import { Profile } from '../components/Profile/Profile'
import { RightSide } from 'components/RightSide'
import { PostList } from './PostList';
import { Route } from 'react-router-dom';
import FullPostPage from './FullPost'
import CreateIcon from '@material-ui/icons/Create';
import { ModalBlock } from 'components/ModalBlock'
import { NewPostForm } from 'components/NewPostForm'
import { SearchSection } from './SearchSection'
import { requestTopTags } from 'store/ducks/Tags/TagReducer'
import { useEffect } from 'react'

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
    border: '1px solid  #EBEEF0',
  }
}))

export const Main = () => {
  const classes = useStyles()
  const isAuth = useSelector(state => isAuthInfo(state))
  const dispatch = useDispatch()
  const [visibleAddTweet, setSetVisibleAddTweet] = React.useState(false);

  useEffect(() => {
    dispatch(requestTopTags())
  }, [dispatch])

  const handleClickOpenAddTweet = () => {
    setSetVisibleAddTweet(true);
  };

  const onCloseAddTweet = () => {
    setSetVisibleAddTweet(false);
  };

  return <Grid container>
    <Grid item md={3} sm={4} xs={12}>
      {isAuth
        ? (
          <>
            <Profile />
            <div className={classes.buttonWrapper}>
              <Button
                onClick={handleClickOpenAddTweet}
                className={classes.TweetButton}
                variant="contained"
                color="primary"
                fullWidth>
                <Hidden smDown>Tweet</Hidden>
                <Hidden mdUp>
                  <CreateIcon />
                </Hidden>
              </Button>
              <ModalBlock onClose={onCloseAddTweet} visible={visibleAddTweet}>
                <div style={{ width: 550 }}>
                  <NewPostForm />
                </div>
              </ModalBlock>
            </div>
          </>
        )
        : <LoginNotification />}
    </Grid>
    <Grid item md={6} sm={8} xs={12} className={classes.middleWrapper}>
      <Route exact path='/main'>
        <PostList />
      </Route>
      <Route path='/main/post/:id'>
        <FullPostPage />
      </Route>
      <Route path='/main/search'>
        <SearchSection />
      </Route>
    </Grid>
    <Grid item md={3} sm={6} xs={12} >
      <div className={classes.TagsSection}>
        <RightSide />
      </div>
    </Grid>
  </Grid>
}
