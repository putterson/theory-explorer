import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ExplorerActions from '../actions'
import Fretboard from '../components/Fretboard'
import { TuningSelector, Tuning } from '../containers/TuningContainer'
import Board from '../stores/Board'

import _ from 'lodash'

const App = () => (
    <div>
    Tuning is <TuningSelector/>
    <Fretboard/>
    </div>
)

export default App
