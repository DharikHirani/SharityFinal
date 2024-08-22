import React from 'react';
import { Alert } from 'react-bootstrap';

export default function InfoAlert({ children, variant = "primary" }) {
	return (
		<div
			className="d-flex w-100 justify-content-center"
			style={{
				position: 'fixed',
				bottom: 0,
				zIndex: 900000
			}}
		>
			<Alert variant={variant} className="m-4">
				{children}
			</Alert>
		</div>
	)
}