import * as React from 'react';
import * as classnames from 'classnames';
import { i18n } from '../../../../utils';
import { ServiceClass } from '../../../../state';
import { SetClassAction } from '../../../../store/form/additional/actions';

interface Props {
	setClassType: (classType: ServiceClass) => SetClassAction;
	classOptions: string[];
	classType: ServiceClass;
}

export default class ClassType extends React.Component<Props> {

	setClassHandler(value: string): void {
		this.props.setClassType(value as ServiceClass);
	}

	renderOptions(): React.ReactNode {
		const { classOptions, classType } = this.props;

		return classOptions.map((value, index) => {
			return <div key={index} className={classnames('widget-form-classType__inner__button', { 'widget-form-classType__inner__button_selected': classType === value })} onClick={() => {
				this.setClassHandler(value);
			}}>
				{i18n('form', 'class_' + value)}
				<span className="widget-form-classType__class">
					{i18n('form', 'class')}
				</span>
			</div>;
		});
	}

	render(): React.ReactNode {
		return <div className="widget-form-classType">
			<div className="widget-form-classType__inner">
				{this.renderOptions()}
			</div>
		</div>;
	}
}
