import * as React from 'react';
import { FormEventHandler } from 'react';

interface Props {
	label: string;
	id: string;
	trigger?: FormEventHandler<HTMLInputElement>;
	checked?: boolean;
	isVisible?: boolean;
}

export class Checkbox extends React.Component<Props> {
	static defaultProps: Partial<Props> = {
		isVisible: true
	};

	render(): React.ReactNode {
		const { id, label, trigger, checked, isVisible } = this.props;

		return isVisible ? <div className="widget-ui-checkbox">
			<input className="widget-ui-checkbox__input" type="checkbox" id={id} onChange={trigger} checked={checked}/>
			<label htmlFor={id}>
				<span className="widget-ui-checkbox__caption">
					{label}
				</span>
			</label>
		</div> : null;
	}
}
