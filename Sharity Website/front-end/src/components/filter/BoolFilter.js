import React from 'react';
import { Button } from 'react-bootstrap';
import FilterPill from './FilterPill';

export default function BoolFilter({ state, toggleState, children }) {
	return (
		<Button
			size="sm"
			variant={state ? "primary" : "outline-primary"}
			style={{ borderRadius: 20 }}
			className="mt-2"
			onClick={toggleState}
		>
			{children}
		</Button>
	)
}