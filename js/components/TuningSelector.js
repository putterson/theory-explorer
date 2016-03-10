import React, { PropTypes } from 'react'

const TuningSelector = ({ onTuningSelect, tunings, currentTuning }) => (
  <select
     value={currentTuning.name}
     onChange={({target: {value}}) => {onTuningSelect(value);}}>
    {tunings.map(function(tuning) {
      return <option key={tuning.name}
      value={tuning.name}>
	{tuning.name}</option>})}
  </select>
)

export default TuningSelector
