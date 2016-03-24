import * as React from 'react';
import Fretboard from '../components/Fretboard'
import { TuningSelector } from '../containers/TuningContainer'
import { KeyContainer } from  '../containers/KeyContainer'

const App = () => (
    <div>
    Tuning is <TuningSelector/>
    <KeyContainer/>
    <Fretboard/>
    </div>
)

export default App
