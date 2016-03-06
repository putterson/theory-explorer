import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './js/components/App'
import explorerApp from './js/reducers'

let store = createStore(explorerApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-container')
)
