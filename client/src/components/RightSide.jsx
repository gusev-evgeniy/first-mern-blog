import { Divider, List, ListItem, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { getSearchPosts, loadTopTags } from 'store/selectors/Selectors'
import { SearchField } from './SearchField'
import { requestSearchPosts } from '../store/ducks/Search/SearchReducer';

const useStyles = makeStyles((theme) => ({
  RightSide: {
    position: 'fixed',
  },
  TopTagsWrapper: {
    maxWidth: 248,
    backgroundColor: '#f7f9fa',
    borderRadius: 15,
    marginTop: theme.spacing(2),
    paddingBottom: 13,
    '& .MuiList-root': {
      paddingTop: 0,
    },
  },
  TopTagsHeader: {
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
    padding: '13px 18px',
    backgroundColor: 'transparent',
    '& b': {
      fontSize: 20,
      fontWeight: 800,
    },
  },
  TopTagsItem: {
    cursor: 'pointer',
    '& .MuiTypography-body1': {
      fontWeight: 700,
    },
    '& .MuiListItemAvatar-root': {
      minWidth: 50,
    },
    '& .MuiListItemText-root': {
      margin: 0,
    },
    '&:hover': {
      backgroundColor: '#edf3f6',
    },
    '& a': {
      color: 'inherit',
      textDecoration: 'none',
    },
  },
}))

export const RightSide = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const topTagsList = useSelector(state => loadTopTags(state))
  const searchPostsData = useSelector(state => getSearchPosts(state))

  const handelClick = (tag) => {
    dispatch(requestSearchPosts(tag))

  }

  return (<div className={classes.RightSide}>
    <SearchField />
    {topTagsList && topTagsList.length > 0
      ? <Paper className={classes.TopTagsWrapper}>
        <Paper className={classes.TopTagsHeader} variant="outlined">
          <b>Актуальные темы</b>
        </Paper>
        <List>
          {topTagsList.map((tags) => (
            <React.Fragment key={tags._id}>
              <ListItem className={classes.TopTagsItem}>
                <ListItemText
                  primary={tags._id}
                  onClick={() => handelClick(tags._id)}
                  secondary={
                    <Typography component="span" variant="body2" color="textSecondary">
                      Твитов: {tags.count}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </Paper>
      : null}
  </div>
  )
}
