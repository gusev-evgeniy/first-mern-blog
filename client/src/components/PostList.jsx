import React from 'react'
import {Card, Typography} from '@material-ui/core';
import {PostCard} from './PostsList/PostCard';

export  const PostList = ({ loadPostList, postsList, deletePost, userInfo }) => {
  if (postsList.length === 0) {
    return <Card >
      <Typography gutterBottom variant="h6" color='primary'> There are no posts yet</Typography>
    </Card>
  }
  return postsList.map(post => {
    return <PostCard key={post._id} postData={post} deletePost={deletePost} userId={userInfo._id} />
  })
}