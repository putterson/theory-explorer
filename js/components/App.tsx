import * as React from 'react';
import Fretboard from '../components/Fretboard'
import { TuningSelector } from '../connectors/TuningSelector'
import { ScaleSelector } from '../connectors/ScaleSelector'
import { KeySelector } from  '../connectors/KeySelector'

const App = () => (
    <div>
    Tuning is <TuningSelector/>
    Scale is <ScaleSelector/>
    <KeySelector/>
    <Fretboard/>
    </div>
)

export default App
