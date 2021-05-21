import React, { useEffect } from 'react'
import { Container, LinearProgress } from '@material-ui/core'
import { BrowserRouter, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { Navbar } from './components/Navbar'
import PostPage from './pages/FullPostPage'
import PostsList from './pages/Main'
import NewPost from './pages/NewPost'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { auth } from './store/ducks/User/UserReducer'
import { isInitializedInfo } from 'store/selectors/Selectors'
import { initializeApp } from './store/ducks/Initialize/InitializeReducer'
import Main from './pages/Main';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(29, 161, 242)',
      dark: 'rgb(26, 145, 218)',
      contrastText: '#fff',
    },
    secondary: {
      main: 'rgb(26, 145, 218)',
    },
    background: {
      default: '#fff',
    },
    text: {
      primary: '#14171a',
    },
    action: {
      disabledBackground: 'rgb(153 216 255)',
      disabled: '#fff',
    },
  },
});

function App() {
  const dispatch = useDispatch()
  const isInitialized = useSelector(state => isInitializedInfo(state))

  useEffect(() => {
    dispatch(initializeApp())
  }, [])

  if (!isInitialized) {
    return <LinearProgress />
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className='App'>
          <Navbar />
          <Container className='container'>
            <Route path='/main'>
              <Main />
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
          </Container>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App

