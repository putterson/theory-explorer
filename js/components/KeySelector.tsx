const React = require('react')
import {PitchClass} from '../stores/Board'

interface KeySelectorState {
    onKeySelect : Function,
    keys : Array<PitchClass>,
    currentKey : PitchClass
}

const KeySelector = ({ onKeySelect, keys, currentKey } : KeySelectorState) => (
    <div className="btn-group" role="group" data-toggle="buttons">
    {keys.map(function(key : PitchClass){
      return <button
      type="button"
      className={"btn btn-default" + (key.name === currentKey.name ? 'active' : '')}
      key={key.id}
      id={key.id}
      onClick={onKeySelect.bind(this, key.id)}>
	{key.name}
	</button>
    })}
  </div>
)

export default KeySelector
