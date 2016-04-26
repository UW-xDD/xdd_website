import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import statsApp from './reducers'
import App from './components/App'
import { fetchDictionaries } from './actions'

let store = createStore(
  statsApp,
  applyMiddleware(thunkMiddleware)
)

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('react')
)

store.dispatch(fetchDictionaries()).then(() => console.log(store.getState()))
