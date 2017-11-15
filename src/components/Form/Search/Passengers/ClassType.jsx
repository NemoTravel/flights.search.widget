import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { i18n } from 'utils';

export default class ClassType extends React.Component {
	static propTypes = {
		setClassType: PropTypes.func.isRequired,
		classOptions: PropTypes.array.isRequired,
		classType: PropTypes.string.isRequired
	};

	constructor(props) {
		super(props);
	}

	renderOptions() {
		const { setClassType, classOptions, classType } = this.props;

		return classOptions.map((value, index) => {
			return <div className={classnames('widget-form-classType__inner__button', { 'widget-form-classType__inner__button_selected': classType === value })} onClick={() => {
				setClassType(value);
			}} key={index}>
				{i18n('form', 'class_' + value)}
			</div>;
		});
	}

	render() {
		return <div className="widget-form-classType">
			<div className="widget-form-classType__inner">
				{this.renderOptions()}
			</div>
		</div>;
	}
}
