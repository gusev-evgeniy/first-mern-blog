import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import RepostIcon from '@material-ui/icons/RepeatOutlined';
import { ModalBlock } from '../components/ModalBlock'
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import CommentIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import { ReplyForm } from './ReplyForm'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useDispatch } from 'react-redux';
import { addNewTweet } from 'store/ducks/AddTweet/AddTweetReducer';
import { deleteBookmark, deleteLike, sendBookmark, sendLike } from 'store/ducks/PostsList/PostsListReducer';
import { sendComment } from 'store/ducks/PostDetail/PostDetailReducer';

const useStyles = makeStyles((theme) => ({
  tweetFooter: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'space-between',
  },
  tweetIcon: {
    marginRight: 50,
  },
  likesCount: {
    fontSize: 16,
    marginLeft: 5
  },
}))

export const TweetFooter = ({ postData, userId }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [visibleModalWindow, setVisibleModalWindow] = React.useState('')

  const handleClickOpenWindow = (modalName) => {
    setVisibleModalWindow(modalName)
  }

  const onCloseWindow = () => {
    setVisibleModalWindow(null)
  }

  const handleDeleteLike = () => {
    dispatch(deleteLike(postData._id, userId))
  }

  const handleAddLike = () => {
    dispatch(sendLike(postData._id, userId))
  }

  const handleDeleteBookmark = () => {
    dispatch(deleteBookmark(postData._id, userId))
  }

  const handleAddBookmark = () => {
    dispatch(sendBookmark(postData._id, userId))
  }

  const returnLikeButton = (isLiked, actionFunction) => {
    return <IconButton color={isLiked ? "secondary" : "primary"} onClick={actionFunction}>
      {isLiked ? <FavoriteIcon style={{ fontSize: 20 }} /> : <FavoriteBorderIcon style={{ fontSize: 20 }} />}
      <span className={classes.likesCount}>{postData.likes.length}</span>
    </IconButton>
  }

  const returnBookmarksButton = (inBookmarks, actionFunction) => {
    return <IconButton color="primary" onClick={actionFunction}>
      {inBookmarks ? <BookmarkIcon style={{ fontSize: 20 }} /> : <BookmarkBorderIcon style={{ fontSize: 20 }} />}
    </IconButton>
  }

  return (
    <>
      <div>
        <div className={classes.tweetFooter}>
          <div className={classes.tweetIcon} >
            {postData.likes.includes(userId) ? returnLikeButton(true, handleDeleteLike) : returnLikeButton(false, handleAddLike)}
          </div>
          <div className={classes.tweetIcon}>
            <IconButton color='primary' onClick={() => handleClickOpenWindow('RepostBlock')}>
              <RepostIcon style={{ fontSize: 20 }} />
            </IconButton>
          </div>
          <div className={classes.tweetIcon} onClick={() => handleClickOpenWindow('CommentBlock')}>
            <IconButton color='primary'>
              <CommentIcon style={{ fontSize: 20 }} />
            </IconButton>
          </div>
          <div className={classes.tweetIcon} >
            {postData?.bookmarks.includes(userId) ? returnBookmarksButton(true, handleDeleteBookmark) : returnBookmarksButton(false, handleAddBookmark)}
          </div>
        </div>
      </div>
      <ModalBlock onClose={onCloseWindow} title={'Repost'} visible={visibleModalWindow === 'RepostBlock'}>
        <div style={{ maxWidth: 550 }}>
          <ReplyForm func={addNewTweet} replyPostId={postData._id} onCloseWindow={onCloseWindow} />
        </div>
      </ModalBlock>
      <ModalBlock onClose={onCloseWindow} title={'Comment'} visible={visibleModalWindow === 'CommentBlock'}>
        <div style={{ maxWidth: 550 }}>
          <ReplyForm func={sendComment} replyPostId={postData._id} onCloseWindow={onCloseWindow} />
        </div>
      </ModalBlock>
    </>
  )
}
