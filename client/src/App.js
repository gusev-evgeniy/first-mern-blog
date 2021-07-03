import React, { useEffect } from 'react'
import { Container, LinearProgress } from '@material-ui/core'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { isInitializedInfo } from 'store/selectors/Selectors'
import { initializeApp } from './store/ducks/Initialize/InitializeReducer'
import { Main } from './pages/Main';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(29, 161, 242)',
      dark: 'rgb(26, 145, 218)',
      contrastText: '#fff',
    },
    secondary: {
      main: 'rgb(218, 80, 26)',
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

  const { isInitialized } = useSelector(isInitializedInfo)
  useEffect(() => {
    dispatch(initializeApp())
  }, [dispatch])

  if (!isInitialized) {
    return <LinearProgress />
  }

  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Container className='container'>
          <Route path='/home'>
            <Main />
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App

