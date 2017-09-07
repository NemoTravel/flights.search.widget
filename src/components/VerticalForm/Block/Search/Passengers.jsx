import React, { Component } from 'react';
import { connect } from 'react-redux';
import NemoDropdown from 'components/UI/Dropdown';
import Counter from 'components/VerticalForm/Block/Search/Passengers/Counter';

class Passengers extends Component {
	render() {
		return <NemoDropdown
			triggerElement={
				<div className="nemo-widget-form__input__wrapper">
					<input type="text" className="form-control" readOnly={true} spellCheck={false} ref={input => this.inputField = input}/>
					<div className="nemo-ui-icon nemo-widget-form__input__arrow" onClick={() => this.inputField.focus()}/>
				</div>
			}
			contentElement={
				<div>
					{/*<Counter info={}/>*/}
					{/*<Counter info={}/>*/}
					{/*<Counter info={}/>*/}
					<div>Дети (2-11)</div>
					<div>
						<div>-</div>
						<div>0</div>
						<div>+</div>
					</div>
					<div>Младенцы (0-2)</div>
					<div>
						<div>-</div>
						<div>0</div>
						<div>+</div>
					</div>
				</div>
			}
		/>
	}
}

export default connect(state => state)(Passengers);