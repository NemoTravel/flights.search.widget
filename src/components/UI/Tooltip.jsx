import React, { Component } from 'react';
import classnames from 'classnames';

export default class Tooltip extends Component {
	shouldComponentUpdate(nextProps) {
		const { isActive, message, children } = this.props;
		return isActive !== nextProps.isActive || message !== nextProps.message || children !== nextProps.children;
	}
	
	render() {
		const { 
			children:innerComponent, 
		  	message, 
		  	isActive, 
		  	isCentered 
		} = this.props;
		
		return <div className="widget-ui-tooltip">
			<div className={classnames('widget-ui-tooltip__pop', { 
				'widget-ui-tooltip__pop_visible': isActive,
				'widget-ui-tooltip__pop_centered': isCentered
			})}>
				{message}
			</div>
			
			{innerComponent}
		</div>;
	}
}