import * as React from 'react';
import Fretboard from '../components/Fretboard'
import { TuningSelector } from '../connectors/TuningSelector'
import { ScaleSelector } from '../connectors/ScaleSelector'
import { KeySelector } from  '../connectors/KeySelector'
import { ChordSelector } from '../connectors/ChordSelector'
import { ModeSelector } from '../connectors/ModeSelector'
import { AppMode } from '../reducers/mode' 

const App = ({ mode }) => (
    <div>
    <ModeSelector/>
    <p/>Tuning is <TuningSelector/>
    {mode === AppMode.Scales ? (<p>Scale<ScaleSelector/></p>) : null}
    {/* {!(mode === AppMode.Search) ? (<p>Chord<ChordSelector/></p>) : null} */}
    <KeySelector/>
    <Fretboard/>
    </div>
)

export default App
