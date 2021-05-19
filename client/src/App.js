import React, { useEffect } from 'react'
import { Container, LinearProgress } from '@material-ui/core'
import { BrowserRouter, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { Navbar } from './components/Navbar/Navbar'
import PostPage from './pages/PostPage'
import PostsList from './pages/PostsList'
import NewPost from './pages/NewPost'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { auth } from './store/ducks/User/UserReducer'
import { isInitializedInfo } from 'store/selectors/Selectors'
import { initializeApp } from './store/ducks/Initialize/InitializeReducer'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    }
  },
});

function App() {
  const dispatch = useDispatch()
  const isInitialized = useSelector(state => isInitializedInfo(state))

  useEffect(() => {
    dispatch(initializeApp())
  }, [])

  if (!isInitialized) {
    return <LinearProgress/>
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className='App'>
          <Navbar />
          <Container className='container'>
            <Route path='/post/:id'>
              <PostPage />
            </Route>
            <Route path='/posts-list'>
              <PostsList />
            </Route>
            <Route path='/new-post'>
              <NewPost />
            </Route>
            <Route path='/signup'>
              <Signup />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route exact path='/'>
              <PostsList />
            </Route>
          </Container>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App

