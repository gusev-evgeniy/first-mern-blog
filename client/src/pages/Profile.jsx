import { Avatar, Button, CircularProgress, Fab, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchProfile } from 'store/ducks/Profile/ProfileReducer'
import { loadDefaultImage } from './../store/selectors/Selectors'
import { getProfileInfo } from 'store/selectors/Selectors'
import { changeStatusAction } from 'store/ducks/AddTweet/AddTweetReducer'
import { uploadPhoto } from 'store/ducks/User/UserReducer'
import EditIcon from '@material-ui/icons/Edit'
import { EditProfile } from 'components/EditProfile'

const useStyles = makeStyles((theme) => ({
  profileWrapper: {
    height: 400,
    borderBottom: '1px solid  #EBEEF0',
  },
  profileTitle: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    top: 0,
    padding: 16,
    borderBottom: '1px solid  #EBEEF0',
    backgroundColor: '#fff',
    fontSize: 15,
    '& p': {
      fontWeight: 700,
      fontSize: 22,
    },
    '& span': {
      fontSize: 13,
      color: 'rgb(91, 112, 131)',
    }
  },
  profileBigImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#c4cfd6'
  },
  profileHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    transform: 'translateY(-30%)',
    alignItems: 'center',
    padding: '12px 16px'

  },
  profileAva: {
    height: 140,
    width: 140,
    border: '4px solid #fff',
  },
  profileInfo: {
    '& h4': {
      fontWeight: 800,
      fontSize: 20
    },
    '& h5': {
      fontWeight: 500,
      color: '#5b7083'
    },
    '& p': {
      marginTop: 10,
      color: '#5b7083'
    },
    '& span': {
      color: 'hsl(0, 0%, 0%)'
    }
  },
  profileFollow: {
    display: 'flex',
    width: 180,
    justifyContent: 'space-between',
    '& span': {
      marginRight: 5
    }
  },
  divider: {
    display: 'flex',
    flex: 1,
    height: 13,
    backgroundColor: '#f7f9fa',
  },
  button: {
    position: 'absolute',
    bottom: 0,
    right: 50
  },
  imageWrapper: {
    position: 'relative',
  }
}))

export const Profile = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { id } = useParams()
  const defaultImage = useSelector(state => loadDefaultImage(state))
  const { profile, status } = useSelector(state => getProfileInfo(state))
  console.log(profile)
  useEffect(() => {
    dispatch(fetchProfile(id))

    return (() => {
      dispatch(changeStatusAction('LOADING'))
    })
  }, [])

  if (status === 'LOADING') {
    return <CircularProgress />
  }

  const handleImageChange = (e) => {
    const photo = e.target.files[0]
    dispatch(uploadPhoto(photo))
  }


  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput')
    fileInput.click()
  }

  return (
    <div>
      <div className={classes.profileTitle}>
        <p>{profile.name}</p>
        <span>1 Tweet</span>
      </div>
      <div className={classes.profileWrapper}>
        <div className={classes.profileBigImage}></div>
        <div className={classes.profileHeader}>
          <div className={classes.profileInfo}>
            <div className={classes.imageWrapper}>
              <Avatar
                src={profile.photo
                  ? `data:${profile.photo.contentType};base64, ${profile.photo.imageBase64}`
                  : defaultImage}
                className={classes.profileAva}
                alt={`Аватарка пользователя`}
              />
              <input type="file" hidden id="imageInput" onChange={handleImageChange} name='image' />
              <Fab color="primary" aria-label="add" size='small' className={classes.button} onClick={handleEditPicture}>
                <EditIcon />
              </Fab>
            </div>
            <h4>{profile.name}</h4>
            <h5>@{profile.name}</h5>
            <p>{profile.bio}</p>
            <p>{profile.data}</p>
            <p>{profile.website}</p>
            <div className={classes.profileFollow}>
              <p><span>9</span>Following</p>
              <p><span>0</span>Followers</p>
            </div>
          </div>
          <EditProfile />
        </div>
      </div>
      <div className={classes.divider}></div>
    </div>
  )
}
