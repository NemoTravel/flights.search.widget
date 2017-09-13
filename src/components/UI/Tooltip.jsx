import React, { Component } from 'react';
import classnames from 'classnames';

export default class Tooltip extends Component {
	render() {
		const { children:innerComponent, message, isActive } = this.props;
		
		return <div className="nemo-ui-tooltip">
			<div className={classnames('nemo-ui-tooltip__pop', { 'nemo-ui-tooltip__pop_visible': isActive })}>
				{message}
			</div>
			
			{innerComponent}
		</div>;
	}
}