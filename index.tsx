import { render } from 'react-dom'
const React = require('react')
const { Provider } = require('react-redux')
import { createStore } from 'redux'
import App from './js/components/App'
import explorerApp from './js/reducers'

let store = createStore(explorerApp, undefined, window.hasOwnProperty('devToolsExtension') ? window['devToolsExtension']() : undefined)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-container')
)
