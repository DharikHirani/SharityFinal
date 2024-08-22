import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAllOrganisers from '../../hooks/useAllOrganisers';
import useLocationsFilters from '../../hooks/useLocationsFilters';
import Filters from '../filter/Filters';
import LocationsList from '../LocationsList';

export default function MemberSavedLocations({ user }) {
	const [locations, setLocations] = useState([])

	useEffect(() => {
		fetch(`http://localhost:8080/user/${user.id}/locations`)
			.then((res) => res.json())
			.then((data) => {
				setLocations(data);
			})
			.catch(console.log);
	}, [user])

	const backTo = {
		text: 'Back to member section',
		path: '/profile'
	}

	const organisers = useAllOrganisers()
	const [initFilters, setInitFilters] = useState([])

	useEffect(() => {
		setInitFilters([
			{
				name: "Type",
				currentFilter: -1,
				options: [
					{ id: -1, name: "All" },
					{ id: 2, name: "Food Bank" },
					{ id: 3, name: "Community Centre" },
					{ id: 4, name: "Religious Institution" },
				],
				match: ({ location, currentFilter, options }) => location.eventType === options.find((el) => el.id === currentFilter).name
			},
			{
				name: "Organiser",
				currentFilter: -1,
				options: [{ id: -1, name: "All" }, ...organisers],
				match: ({ location, currentFilter }) => location.organiser.id === currentFilter
			},
		])
	}, [organisers])

	const [filteredLocations, filters, setFilter] = useLocationsFilters(
		locations,
		initFilters
	);

	return (
		<Row className="d-flex justify-content-center">
			{locations.length > 0 ? (
				<>
					<Col lg={4} className="mb-3">
						<Card className="rounded-0 mb-3">
							<Card.Body>
								<Card.Text className="mb-0">
									You saved {locations.length} locations.
						</Card.Text>
								<Filters filters={filters} setCurrentMapFilter={setFilter} />
							</Card.Body>
						</Card>
						<Link to={{
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
						</Link>
					</Col>
					<Col lg={8}>
						{filteredLocations.length > 0 ? (
							<Card className="rounded-0 border-top-0">
								<LocationsList locations={filteredLocations} backTo={{ ...backTo, single: true }} />
							</Card>
						) : (
							<Card className="rounded-0">
								<Card.Body>
									<Card.Text className="mb-0">
										There are no locations matching your filters.
										</Card.Text>
								</Card.Body>
							</Card>
						)}
					</Col>
				</>
			) : (
				<Col lg={12} className="mb-3">
					<Card className="rounded-0 mb-3">
						<Card.Body>
							<Card.Text className="mb-0">
								You haven't saved any locations.
								</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			)}
		</Row>
	)
}