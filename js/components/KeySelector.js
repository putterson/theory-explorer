import React, { PropTypes } from 'react'

const KeySelector = ({ onKeySelect, keys, currentKey }) => (
    <div>
    {keys.map(function(key){
      return <label key={key.id}>
	<input
      type="radio"
      id={key.id}
      name="options"
      onChange={({target: {id}}) => {onKeySelect(id)}}/>
	{key.name}
      </label>
    })}
  </div>
)

export default KeySelector
