import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ExplorerActions from '../actions'
import Fretboard from '../components/Fretboard'
import { TuningSelector } from '../containers/TuningContainer'
import { KeyContainer } from  '../containers/KeyContainer'
import Board from '../stores/Board'

const App = () => (
    <div>
    Tuning is <TuningSelector/>
    <KeyContainer/>
    <Fretboard/>
    </div>
)

export default App
