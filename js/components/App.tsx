import * as React from 'react';
import Fretboard from '../components/Fretboard'
import { TuningSelector } from '../connectors/TuningSelector'
import { KeySelector } from  '../connectors/KeySelector'

const App = () => (
    <div>
    Tuning is <TuningSelector/>
    <KeySelector/>
    <Fretboard/>
    </div>
)

export default App
