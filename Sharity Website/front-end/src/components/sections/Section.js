import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';

export default function Section({ children, className = '' }) {
	const isScreenSm = useMediaQuery({ query: '(min-width: 576px)' })
	const classes = className + " d-flex justify-content-center py-4 my-2"

	return (
		<Container>
			<Row className={classes}>
				<Col className={!isScreenSm ? "px-0" : ""}>
					{ children }
				</Col>
			</Row>
		</Container>
	)
}