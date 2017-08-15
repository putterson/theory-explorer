const React = require('react')
import {PitchClass} from '../stores/Board'

export interface Button {
    name : string,
    id : string
}

export interface RadioButtonSelectorState {
    buttons : Array<Button>,
    selectedButton : string
}

export interface RadioButtonSelectorDispatch {
    onButtonSelect : any
}


const RadioButtonSelector = ({ onButtonSelect, buttons, selectedButton } : RadioButtonSelectorState & RadioButtonSelectorDispatch ) => (
    <div className="btn-group" role="group" data-toggle="buttons">
    {buttons.map(function(button : Button){
      return <button
      type="button"
      className={"btn btn-default" + (button.name === selectedButton ? 'active' : '')}
      key={button.id}
      id={button.id}
      onClick={onButtonSelect.bind(this, button.id)}>
	{button.name}
	</button>
    })}
  </div>
)

export default RadioButtonSelector
