import React, { useState } from 'react';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';

export default function OptionsSection({ options, defaultActiveOption = 0 }) {
	const [activeOption, setActiveOption] = useState(0)
	
	return (
		<Row className="d-flex justify-content-center">
			<Col lg={4}>
				<Card className="rounded-0 mb-3">
					<ListGroup variant="flush" className="rounded-0">
						{options.map((option, index) => (
							<ListGroup.Item
								action
								className="rounded-0"
								active={activeOption == index}
								onClick={() => setActiveOption(index)}
								style={{cursor: 'pointer'}}
							>
								{option.title}
							</ListGroup.Item>
						))}
					</ListGroup>
				</Card>
			</Col>
			<Col lg={8}>
				<Card className="rounded-0">
					{options[activeOption].content}
				</Card>
			</Col>
		</Row>
	)
}

