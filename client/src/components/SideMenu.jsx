import { IconButton, makeStyles } from '@material-ui/core'
import React from 'react'
import TwitterIcon from '@material-ui/icons/Twitter';
import SearchIcon from '@material-ui/icons/Search';
import NotificationIcon from '@material-ui/icons/NotificationsNoneOutlined';
import MessageIcon from '@material-ui/icons/EmailOutlined';
import BookmarkIcon from '@material-ui/icons/BookmarkBorderOutlined';
import ListIcon from '@material-ui/icons/ListAltOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import UserIcon from '@material-ui/icons/PermIdentityOutlined';
import CreateIcon from '@material-ui/icons/Create';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ModalBlock } from './ModalBlock';
import { SubmitForm } from './SubmitForm';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { addNewPost } from 'store/ducks/PostsList/PostsListReducer'
import { getUserInfo } from 'store/selectors/Selectors';

const useStyles = makeStyles((theme) => ({
  sideMenuList: {
    position: 'sticky',
    top: 0,
    listStyle: 'none',
    padding: 0,
    margin: 0,
    maxWidth: 230,
  },
  sideMenuListItem: {
    '& a': {
      color: 'inherit',
      textDecoration: 'none',
    },
    cursor: 'pointer',
    '&:hover': {
      '& div': {
        backgroundColor: 'rgba(29, 161, 242, 0.1)',
        '& h6': {
          color: theme.palette.primary.main,
        },
        '& svg path': {
          fill: theme.palette.primary.main,
        },
      },
    },

    '& div': {
      display: 'inline-flex',
      alignItems: 'center',
      position: 'relative',
      padding: '0 25px 0 20px',
      borderRadius: 30,
      height: 50,
      marginBottom: 15,
      transition: 'background-color 0.1s ease-in-out',
    },
  },
  logo: {
    margin: '10px 0',
  },
  logoIcon: {
    fontSize: 36,
  },
  sideMenuListItemIcon: {
    fontSize: 32,
    marginLeft: -5,
  },
  sideMenuListItemLabel: {
    fontWeight: 700,
    fontSize: 20,
    marginLeft: 15,
  },
  sideMenuTweetButton: {
    display: 'flex',
    alignSelf: 'center',
    padding: theme.spacing(1.7),
    marginTop: theme.spacing(2),
    borderRadius: 9999
  },
}));


export const SideMenu = () => {
  const classes = useStyles()
  const { _id } = useSelector(state => getUserInfo(state))
  const [visibleAddTweet, setSetVisibleAddTweet] = React.useState(false);

  const handleClickOpenAddTweet = () => {
    setSetVisibleAddTweet(true);
  };

  const onCloseAddTweet = () => {
    setSetVisibleAddTweet(false);
  };

  return (
    <>
      <ul className={classes.sideMenuList}>
        <li className={classes.sideMenuListItem}>
          <Link to="/home">
            <IconButton className={classes.logo} aria-label="" color="primary">
              <TwitterIcon className={classes.logoIcon} />
            </IconButton>
          </Link>
        </li>
        <li className={classes.sideMenuListItem}>
          <Link to="/home">
            <div>
              <HomeIcon className={classes.sideMenuListItemIcon} />
              <Hidden smDown>
                <Typography className={classes.sideMenuListItemLabel} variant="h6">
                  Home
                </Typography>
              </Hidden>
            </div>
          </Link>
        </li>
        <li className={classes.sideMenuListItem}>
          <Link to="/home/search">
            <div>
              <SearchIcon className={classes.sideMenuListItemIcon} />
              <Hidden smDown>
                <Typography className={classes.sideMenuListItemLabel} variant="h6">
                  Search
              </Typography>
              </Hidden>
            </div>
          </Link>
        </li>
        <li className={classes.sideMenuListItem}>
          <div>
            <BookmarkIcon className={classes.sideMenuListItemIcon} />

            <Hidden smDown>
              <Typography className={classes.sideMenuListItemLabel} variant="h6">
                Bookmarks
              </Typography>
            </Hidden>
          </div>
        </li>
        <li className={classes.sideMenuListItem}>
          <Link to={`/home/user/${_id}`}>
            <div>
              <UserIcon className={classes.sideMenuListItemIcon} />

              <Hidden smDown>
                <Typography className={classes.sideMenuListItemLabel} variant="h6">
                  Profile
                </Typography>
              </Hidden>
            </div>
          </Link>
        </li>
        <li className={classes.sideMenuListItem}>
          <Button
            onClick={handleClickOpenAddTweet}
            className={classes.sideMenuTweetButton}
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
              <SubmitForm />
            </div>
          </ModalBlock>
        </li>
      </ul>
    </>
  )
}
