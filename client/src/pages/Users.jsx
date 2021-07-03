import { CircularProgress } from '@material-ui/core'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadUsersList } from 'store/ducks/UsersList/UsersListReducer'
import { getUserInfo, getUsersListInfo } from 'store/selectors/Selectors'
import { UserCard } from 'components/UserCard'

export const Users = () => {
  const dispatch = useDispatch()
  const me = useSelector(getUserInfo)
  const { users, isLoading } = useSelector(getUsersListInfo)

  useEffect(() => {
    dispatch(loadUsersList())
  }, [dispatch])


  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <div>
      {users.map(user => <UserCard key={user._id} user={user} profile={me} />)}
    </div>
  )
}
