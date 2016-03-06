import React, { PropTypes } from 'react'

const TuningSelector = ({ onTuningSelect, tunings, tuning }) => (
  <select
     value={tuning}
     onChange={({target: {value}}) => {
       return onTuningSelect(value);
      }
    }>
    {tunings.map(function(tuning) {
      return <option key={tuning.name}
		       value={tuning.name}>
      {tuning.name}</option>})}
  </select>
)

export default TuningSelector
