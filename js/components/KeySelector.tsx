const React = require('react')

const KeySelector = ({ onKeySelect, keys, currentKey }) => (
    <div className="btn-group" role="group" data-toggle="buttons">
    {keys.map(function(key){
      return <button
      type="button"
      className={"btn btn-default" + (key.name === currentKey ? 'active' : '')}
      key={key.id}
      id={key.id}
      aria-pressed={key.name === currentKey}
      onClick={onKeySelect.bind(this, key.id)}>
	{key.name}
	</button>
    })}
  </div>
)

export default KeySelector
