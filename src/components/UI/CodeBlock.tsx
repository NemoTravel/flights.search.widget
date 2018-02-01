import * as React from 'react';

interface Props {
	children?: React.ReactNode;
}

export default ({ children }: Props) => {
	return <code className="widget-ui-codeBlock">{children}</code>;
};
