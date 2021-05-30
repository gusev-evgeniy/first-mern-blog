import React from 'react'
import TextField from '@material-ui/core/TextField/TextField';
import { InputAdornment, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/SearchOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 30,
      backgroundColor: '#f7f9fa',
      padding: 0,
      marginTop: 2,
      paddingLeft: 15,
      '&.Mui-focused': {
        backgroundColor: 'rgb(237, 243, 246)',
        '& fieldset': { borderWidth: 1, borderColor: theme.palette.primary.main },
        '& svg path': {
          fill: theme.palette.primary.main,
        },
      },
      '&:hover': {
        '& fieldset': { borderColor: 'transparent' },
      },
      '& fieldset': {
        borderWidth: 1,
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: '12px 14px 14px 5px',
    },
  },
}))

export const SearchField = () => {
  const classes = useStyles()

  return (
    <>
      <TextField variant="outlined"
        placeholder="Search by tag"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }} className={classes.root} />
    </>
  )
}
