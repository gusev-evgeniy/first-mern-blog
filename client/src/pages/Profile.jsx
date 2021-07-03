import { Avatar, Button, CircularProgress, Fab, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchProfile } from 'store/ducks/Profile/ProfileReducer'
import { getPostsList, getUserInfo, loadDefaultImage } from './../store/selectors/Selectors'
import { getProfileInfo } from 'store/selectors/Selectors'
import { changeStatusAction } from 'store/ducks/AddTweet/AddTweetReducer'
import { uploadPhoto } from 'store/ducks/User/UserReducer'
import EditIcon from '@material-ui/icons/Edit'
import { EditProfileForm } from 'components/EditProfileForm'
import { ModalBlock } from 'components/ModalBlock'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import { changeStatus, fetchPosts, getUserPosts } from 'store/ducks/PostsList/PostsListReducer'
import { PostsList } from 'components/PostsList'

const useStyles = makeStyles((theme) => ({
  profileWrapper: {
    position: 'relative',
    borderBottom: '1px solid  #EBEEF0',
    paddingBottom: 10
  },
  profileTitle: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    top: 0,
    padding: '10px 16px',
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
    position: 'absolute',
    width: '100%',
    height: 200,
    backgroundColor: '#c4cfd6'
  },
  profileHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    marginTop: 120
  },
  profileAva: {
    height: 140,
    width: 140,
    border: '4px solid #fff',
  },
  profileData: {
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
  profileInfo: {
    marginTop: 10,
    display: 'flex',
    '& div': {
      marginRight: 15,
    }
  },
  profileInfoIcon: {
    marginRight: 2,
    color: '#5b7083'
  },
  changeImageButton: {
    position: 'absolute',
    bottom: 0,
    left: 100,
  },
  imageWrapper: {
    position: 'relative',
  },
  editProfileButton: {
    position: 'absolute',
    right: 15,
    top: 100,
    width: 128,
    borderRadius: 9999
  },
  divider: {
    display: 'flex',
    flex: 1,
    height: 13,
    backgroundColor: '#f7f9fa',
  },
}))

export const Profile = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const defaultImage = useSelector(loadDefaultImage)
  const { profile, status } = useSelector(getProfileInfo)
  const my = useSelector(getUserInfo)
  const posts = useSelector(getPostsList)
  const { id } = useParams()
  const [visibleEdditProfile, setVisibleEdditProfile] = React.useState(false);
  const isMyProfile = checkProfile()

  function checkProfile() {
    return id === my._id
  }

  useEffect(() => {
    dispatch(fetchProfile(id))
    dispatch(getUserPosts(id))
  }, [dispatch, id])

  useEffect(() => {
    return () => {
      dispatch(fetchPosts([]))
      dispatch(changeStatus(true))
    }
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

  const handleEdditProfile = () => {
    setVisibleEdditProfile(true);
  };

  const onCloseEdditProfile = () => {
    setVisibleEdditProfile(false);
  };

  return (
    <div>
      <div className={classes.profileTitle}>
        <p>{profile.name}</p>
        <span>1 Tweet</span>
      </div>
      <div className={classes.profileBigImage}></div>
      <div className={classes.profileWrapper}>
        <div className={classes.profileHeader}>
          <div className={classes.profileData}>
            <div className={classes.imageWrapper}>
              <Avatar
                src={profile.photo
                  ? `data:${profile.photo.contentType};base64, ${profile.photo.imageBase64}`
                  : defaultImage}
                className={classes.profileAva}
                alt={`Аватарка пользователя`}
              />
              {isMyProfile && <>
                <input type="file" hidden id="imageInput" onChange={handleImageChange} name='image' />
                <Fab color="primary" aria-label="add" size='small' className={classes.changeImageButton} onClick={handleEditPicture}>
                  <EditIcon />
                </Fab></>}
            </div>
            <h4>{profile.name}</h4>
            <h5>@{profile.name}</h5>
            <p>{profile.bio}</p>
            <div className={classes.profileInfo}>
              <div>
                <LocationOnOutlinedIcon className={classes.profileInfoIcon} />
                Location
              </div>
              {profile.website && <div>
                <LinkOutlinedIcon className={classes.profileInfoIcon} />
                {profile.website}
              </div>}
              <div>
                <DateRangeOutlinedIcon className={classes.profileInfoIcon} />
                {profile.data}
              </div>
            </div>
            <div className={classes.profileFollow}>
              <p><span>9</span>Following</p>
              <p><span>0</span>Followers</p>
            </div>
          </div>
          {isMyProfile ? <Button
            className={classes.editProfileButton}
            onClick={handleEdditProfile}
            variant='outlined'
            color="primary"
            fullWidth>
            Edit Profile
          </Button>
            : <Button
              className={classes.editProfileButton}
              color="primary"
              variant='outlined'>
              Follow
            </Button>}
          <ModalBlock title={'Edit'} onClose={onCloseEdditProfile} visible={visibleEdditProfile} >
            <div style={{ width: 550 }}>
              <EditProfileForm />
            </div>
          </ModalBlock>
        </div>
      </div>
      <div className={classes.divider}></div>
      <PostsList posts={posts} />
    </div>
  )
}
