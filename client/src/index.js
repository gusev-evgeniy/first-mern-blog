import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { index } from 'store'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import App from './App'
import { composeWithDevTools } from 'redux-devtools-extension'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <Provider store={createStore(index, composeWithDevTools(applyMiddleware(thunk)))}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

