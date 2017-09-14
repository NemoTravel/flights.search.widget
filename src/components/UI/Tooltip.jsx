import React, { Component } from 'react';
import classnames from 'classnames';

export default class Tooltip extends Component {
	render() {
		const { 
			children:innerComponent, 
		  	message, 
		  	isActive, 
		  	isCentered 
		} = this.props;
		
		return <div className="nemo-ui-tooltip">
			<div className={classnames('nemo-ui-tooltip__pop', { 
				'nemo-ui-tooltip__pop_visible': isActive,
				'nemo-ui-tooltip__pop_centered': isCentered
			})}>
				{message}
			</div>
			
			{innerComponent}
		</div>;
	}
}