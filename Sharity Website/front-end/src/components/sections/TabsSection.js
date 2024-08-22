import React, { useState } from 'react';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import Section from './Section';

export default function TabsSection({ tabs, defaultActiveTab = 0 }) {
	const [activeTab, setActiveTab] = useState(defaultActiveTab)

	return (
		<>
			<Row>
				<Nav justify variant="tabs" className="w-100" defaultActiveKey={activeTab}>
					<Container>
						<Row noGutters>
							<Col className="d-flex">
								{tabs.map((tab, index) => (
									<Nav.Item onClick={() => setActiveTab(index)} key={index}>
										<Nav.Link className="rounded-0 border-top-0" eventKey={index}>{tab.title}</Nav.Link>
									</Nav.Item>
								))}
							</Col>
						</Row>
					</Container>
				</Nav>
			</Row>

			<Section>
				{tabs[activeTab].content}
			</Section>
		</>
	)
}