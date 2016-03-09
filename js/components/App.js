import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ExplorerActions from '../actions'
import Fretboard from '../components/Fretboard'
import { TuningSelector } from '../containers/TuningContainer'
import Board from '../stores/Board'

const App = () => (
    <div>
    Tuning is <TuningSelector/>
    <Fretboard/>
    </div>
)

export default App
