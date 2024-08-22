import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export default function TitleSection({ children }) {
	return (
		<Row className="border-bottom mt-5">
			<Container className="d-flex justify-content-center mb-5">
				<Col className="px-0">
					{children}
				</Col>
			</Container>
		</Row>
	)
}
