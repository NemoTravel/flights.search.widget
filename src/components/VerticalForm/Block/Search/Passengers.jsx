import React, { Component } from 'react';
import { connect } from 'react-redux';
import NemoDropdown from 'components/UI/Dropdown';
import Counter from 'components/VerticalForm/Block/Search/Passengers/Counter';

class Passengers extends Component {
	render() {
		return <div className="nemo-widget-form-passengers">
			<NemoDropdown
				triggerElement={
					<div className="nemo-widget-form-passengers__trigger nemo-widget-form__input__wrapper">
						<input type="text" className="form-control" value="1 Пассажир" readOnly={true} spellCheck={false} ref={input => this.inputField = input}/>
						<div className="nemo-ui-icon nemo-widget-form__input__arrow" onClick={() => this.inputField.focus()}/>
					</div>
				}
				contentElement={
					<div className="nemo-widget-form-passengers__content">
						<div className="nemo-widget-form-passengers__item">
							<div className="nemo-widget-form-passengers__title">Взрослые (12+)</div>
							<div className="nemo-widget-form-passengers__counter">
								<div className="nemo-ui-icon nemo-widget-form-passengers__icon nemo-widget-form-passengers__minus"/>
								<div className="nemo-widget-form-passengers__number">1</div>
								<div className="nemo-ui-icon nemo-widget-form-passengers__icon nemo-widget-form-passengers__plus"/>
							</div>
						</div>
						
						<div className="nemo-widget-form-passengers__item nemo-widget-form-passengers__item_disabled">
							<div className="nemo-widget-form-passengers__title">Дети (2-11)</div>
							<div className="nemo-widget-form-passengers__counter">
								<div className="nemo-ui-icon nemo-widget-form-passengers__icon nemo-widget-form-passengers__minus"/>
								<div className="nemo-widget-form-passengers__number">0</div>
								<div className="nemo-ui-icon nemo-widget-form-passengers__icon nemo-widget-form-passengers__plus"/>
							</div>
						</div>
						
						<div className="nemo-widget-form-passengers__item nemo-widget-form-passengers__item_disabled">
							<div className="nemo-widget-form-passengers__title">Младенцы (0-2)</div>
							<div className="nemo-widget-form-passengers__counter">
								<div className="nemo-ui-icon nemo-widget-form-passengers__icon nemo-widget-form-passengers__minus"/>
								<div className="nemo-widget-form-passengers__number">0</div>
								<div className="nemo-ui-icon nemo-widget-form-passengers__icon nemo-widget-form-passengers__plus"/>
							</div>
						</div>
					</div>
				}
			/>
		</div>;
	}
}

export default connect(state => state)(Passengers);