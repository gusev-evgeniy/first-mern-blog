import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { index } from 'store'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import App from './App'
import { composeWithDevTools } from 'redux-devtools-extension'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStore(index, composeWithDevTools(applyMiddleware(thunk)))}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

