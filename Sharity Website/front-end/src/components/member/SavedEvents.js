import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ActualFollowEventButton from '../ActualFollowEventButton';
import GetEventsList from '../GetEventsList';

export default function MemberSavedEvents({ user }) {
	const [events, setEvents] = useState([])

	useEffect(() => {
		fetch(`http://localhost:8080/user/${user.id}/events`)
			.then((res) => res.json())
			.then((data) => {
				setEvents(data);
			})
			.catch(console.log);
	}, [user])

	const backTo = {
		text: 'Back to member section',
		path: '/profile'
	}

    return (
		<Row className="d-flex justify-content-center">
			{events.length > 0 ? (
				<>
					<Col lg={4} className="mb-3">
						<Card className="rounded-0 mb-3">
							<Card.Body>
								<Card.Text className="mb-0">
									You saved {events.length} events.
						</Card.Text>
							</Card.Body>
						</Card>
						{/* <Link to={{
							pathname: `/map`,
							state: {
								backTo: { ...backTo, single: false },
								initLocations: locations,
								filters: { saved: true }
							}
						}}>
							<Button variant="primary" size="sm" className="w-100">
								Show all on the map
					</Button>
						</Link> */}
					</Col>
					<Col lg={8}>
					{events.map((events, index) => (
					<Card className="rounded-0 mb-3" key={index}>
						 <Card.Body className="d-flex justify-content-between align-items-start p-4">
                <div>
                  <Card.Text>
                  <span className="text-muted"> 
                    Name: {events.title}
                    </span>
                    <br />
					<span className="text-muted">
                    Description: {events.description}
                    </span>
					<br />
                    <span className="text-muted">
                    Date: {events.date}
                    </span>
					<br />
					<span className="text-muted">
                    Start Time: {events.startTime} 
                    </span>
					<br />
					<span className="text-muted">
                    End Time: {events.endTime} 
                    </span>
                  </Card.Text>
				  <ActualFollowEventButton /> 
				  </div>
					</Card.Body>
							</Card> 
							))
                    } </Col>
					</>
                   ) : (
					<Col lg={12} className="mb-3">
						<Card className="rounded-0 mb-3">
							<Card.Body>
								<Card.Text className="mb-0">
									You haven't saved any events.
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				)}
		</Row>
	)
}