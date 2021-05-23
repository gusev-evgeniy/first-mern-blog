import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { index } from 'store'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import App from './App'
import { composeWithDevTools } from 'redux-devtools-extension'

ReactDOM.render(
  <Provider store={createStore(index, composeWithDevTools(applyMiddleware(thunk)))}>
    <App />
  </Provider>,
  document.getElementById('root')
);

