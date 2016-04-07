import * as React from 'react'

const DropdownSelector = ({ onSelect, options, currentOption }) => (
  <select
     className="form-control"
     value={currentOption.name}
     onChange={({target: trgt}) => {onSelect(trgt['value']);}}>
    {options.map(function(option) {
      return <option key={option.name}
      value={option.name}>
	{option.name}</option>})}
  </select>
)

export default DropdownSelector
