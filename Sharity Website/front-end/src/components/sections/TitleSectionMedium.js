import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export default function TitleSectionMedium({ children }) {
	return (
		<Row className="border-bottom mt-5">
			<Container className="d-flex justify-content-center mb-5 px-0">
				<Col
					className="px-3"
					style={{ maxWidth: 800 }}
				>
					{children}
				</Col>
			</Container>
		</Row>
	)
}
