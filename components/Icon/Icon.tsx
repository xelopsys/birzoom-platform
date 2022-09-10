import React, { Fragment } from "react";

export function Icon(props: any) {
	return (
		<Fragment>
			<props.Icon className={`${props.class}`} />
		</Fragment>
	);
}
