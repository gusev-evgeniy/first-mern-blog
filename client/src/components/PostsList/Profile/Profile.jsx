import React from 'react'
import Typography from '@material-ui/core/Typography'
import { CalendarToday, LocationOn } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { Button, Card } from '@material-ui/core'
import dayjs from 'dayjs'
import Fab from '@material-ui/core/Fab'

import MuiLink from '@material-ui/core/Link'

import LinkIcon from '@material-ui/icons/Link'
import EditIcon from '@material-ui/icons/Edit'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'
import makeStyles from '@material-ui/core/styles/makeStyles'
import {getUserInfo, isAuthInfo, loadDefaultImage} from 'store/selectors/Selectors'
import { useDispatch, useSelector } from 'react-redux'
import { uploadPhoto, logout } from 'store/ducks/User/UserReducer'
import { EditProfile } from './EditProfile'

const useStyles = makeStyles((theme) => ({
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      maxWidth: 200,
      maxHeight: 200,
      position: 'relative',
      margin: '0 auto'
    },
    '& .profile-image': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '50%'
    },

    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: '#00bcd4'
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  paper: {
    padding: '20px 20px',
    margin: '0 auto'
  },
  button: {
    position: 'absolute',
    bottom: 0,
    right: 0
  }
}))

export const Profile = () => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const user = useSelector(state => getUserInfo(state))
  const isAuth = useSelector(state => isAuthInfo(state))
  const defaultUserImage = useSelector(state => loadDefaultImage(state))


  const handleImageChange = (e) => {
    const photo = e.target.files[0]

    dispatch(uploadPhoto(photo))
  }

  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput')
    fileInput.click()
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  if (!isAuth) {
    return <div>Please enter in account</div>
  }

  return <Card className={classes.paper}>
    <div className={classes.profile}>
      <div className="image-wrapper">
        <img src={user.photo ? `data:${user.photo.contentType};base64, ${user.photo.imageBase64}` : defaultUserImage} className="profile-image" alt="profile" />
        <input type="file" hidden='hidden' id="imageInput" onChange={handleImageChange} />
        <Fab color="primary" aria-label="add" size='small' className={classes.button} onClick={handleEditPicture}>
          <EditIcon />
        </Fab>
      </div>
      <hr />
      <div className="profile-details">
        <MuiLink component={Link} to={`#`} color="primary" variant="h5" >
          {user.name}
        </MuiLink>
        <hr />
        <Typography variant="body2">{user.bio || '...'}</Typography>
        <hr />
        <LocationOn color="primary" /> <span>{user.location || '...'}</span>
        <hr />
        <LinkIcon color="primary" />
        <a href={user.website} target="_blank" rel="noopener noreferrer">
          {user.website || '...'}
        </a>
        <hr />
        <CalendarToday color="primary" />{' '}
        <span>Joined {dayjs(user.data).format('MMM YYYY')}</span>
      </div>
      <Button onClick={handleLogout}>
        Log out
        <KeyboardReturn color="primary" />
      </Button>
      <EditProfile />
    </div>
  </Card >
}