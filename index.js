import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './js/components/App'
import explorerApp from './js/reducers'

let store = createStore(explorerApp, undefined, window.devToolsExtension ? window.devToolsExtension() : undefined)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-container')
)
