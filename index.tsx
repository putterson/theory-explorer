import { render } from 'react-dom'
const React = require('react')
const { Provider } = require('react-redux')
import { createStore } from 'redux'
import { TheoryExplorerApp } from './js/connectors/TheoryExplorerApp'
import explorerApp from './js/reducers'

let store = createStore(explorerApp, undefined, window.hasOwnProperty('__REDUX_DEVTOOLS_EXTENSION__') ? window['__REDUX_DEVTOOLS_EXTENSION__']() : undefined)

render(
  <Provider store={store}>
    <TheoryExplorerApp />
  </Provider>,
  document.getElementById('app-container')
)
