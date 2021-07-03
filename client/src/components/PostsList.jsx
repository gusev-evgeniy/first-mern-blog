import { CircularProgress } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { getPostsListStatus, getUserInfo } from 'store/selectors/Selectors'
import { PostCard } from './PostCard'

export const PostsList = ({ posts }) => {
  const { _id } = useSelector(getUserInfo)
  const isLoading = useSelector(getPostsListStatus)

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <div>
      {
        posts.map(post => {
          return <PostCard key={post._id} postData={post} userId={_id} />
        })
      }
    </div>
  )
}
