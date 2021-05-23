import { Divider, List, ListItem, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadPostListByTags } from 'store/ducks/PostsList/PostsListReducer'

const useStyles = makeStyles((theme) => ({
  rightSideBlock: {
    position: 'fixed',
    backgroundColor: '#f7f9fa',
    borderRadius: 15,
    marginTop: 1,
    paddingBottom: 13,
    '& .MuiList-root': {
      paddingTop: 0,
    },
  },
  rightSideBlockHeader: {
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
  rightSideBlockItem: {
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

const items = [{ id: Math.random() * 1000, tag: 'summer', count: 1488 }]

export const PopularTags = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const handelClick = (tag) => {
    dispatch(loadPostListByTags(tag))
  }

  return (
    <Paper className={classes.rightSideBlock}>
      <Paper className={classes.rightSideBlockHeader} variant="outlined">
        <b>Актуальные темы</b>
      </Paper>
      <List>
        {items.map((obj) => (
          <React.Fragment key={obj._id}>
            <ListItem className={classes.rightSideBlockItem}>
              <ListItemText
                primary={obj.tag}
                onClick={() => handelClick(obj.tag)}
                secondary={
                  <Typography component="span" variant="body2" color="textSecondary">
                    Твитов: {obj.count}
                  </Typography>
                }
              />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </Paper>
  )
}
