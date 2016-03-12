import React, { PropTypes } from 'react'

const KeySelector = ({ onKeySelect, keys, currentKey }) => (
    <div className="btn-group" role="group" data-toggle="buttons">
    {keys.map(function(key){
      return <button
      type="button"
      className={"btn btn-default" + (key.name === currentKey ? 'active' : '')}
      key={key.id}
      id={key.id}
      aria-pressed={key.name === currentKey}
      onClick={({target: {id}}) => {onKeySelect(id)}}>
	{key.name}
	</button>
    })}
  </div>
)

export default KeySelector
