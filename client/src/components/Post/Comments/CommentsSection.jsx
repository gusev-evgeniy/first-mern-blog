import React from 'react'
import { CommentForm } from './CommentForm'
import { CommentsList } from './CommentsList'

export const CommentsSection = ({ postId, commentsInfo }) => {
  return (
    <div>
      <CommentForm postId={postId} />
      {commentsInfo.length > 0 && <CommentsList commentsInfo={commentsInfo} />}
    </div>
  )
}