import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';

export default function SectionMedium({ children, className = '' }) {
	let classes = className + " d-flex justify-content-center py-4 my-2"

	return (
		<Row className={classes}>
			<Col
				className="px-3"
				style={{ maxWidth: 800 }}
			>
				{children}
			</Col>
		</Row>
	)
}