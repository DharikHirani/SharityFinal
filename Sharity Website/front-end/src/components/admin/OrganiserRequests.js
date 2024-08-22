import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import OrganiserRequest from './OrganiserRequest';

export default function OrganiserRequests() {
	const [requests, setRequests] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch('http://localhost:8080/organisers/not-approved')
			.then((res) => res.json())
			.then((data) => {
				setLoading(false)
				setRequests(data)
			})
			.catch(console.log);
	}, [])

	return (
		<Row className="d-flex justify-content-start">
			{loading ? (
				<Card.Text className="mb-0">Loading...</Card.Text>
			) : (
					<>
						<Col lg={4} className="mb-3">
							<Card className="rounded-0 mb-3">
								<Card.Body>
									{requests.length > 0 ? (
										<Card.Text className="mb-0">
											{requests.length === 1 ? 'There is 1 pending request.' : `There are ${requests.length} pending requests.`}
										</Card.Text>
									) : (
											<Card.Text className="mb-0">
												No pending requests.
											</Card.Text>
										)}
								</Card.Body>
							</Card>
						</Col>
						{requests.length > 0 && (
							<Col lg={8}>
								{requests.map((organiser) => (
									<OrganiserRequest key={organiser.id} organiser={organiser} />
								))}
							</Col>
						)}
					</>
				)}
		</Row >
	)
}