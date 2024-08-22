import React, { useContext, useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { CaretLeftFill, CompassFill, GeoAltFill, ShareFill, TagFill } from 'react-bootstrap-icons';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import { isObjectEmpty } from '../helpers';
import UserContext from './context/UserContext';
import SaveLocationButton from './SaveLocationButton';
import EditLocationButton from './EditLocationButton';
import { FacebookIcon } from "react-share";
import { FacebookShareCount } from "react-share";
import ShareButton from './sharebutton';
import { id } from 'date-fns/locale';
import ReportButton from './ReportButton';
import DeleteLocationButton from './DeleteLocationButton';
import GetEventsList from '../components/GetEventsList';
import AddEventButton from './AddEventButton';
import GetEventsListAlt from './MoreDetailsButton';

export default function LocationSingle({ zoomOutToAll, setSingle, state, backTo = null }) {
	const [loading, setLoading] = useState(true)
	const { user, userSignedIn } = useContext(UserContext)
	const [location, setLocation] = useState({})
	const [userSaved, setUserSaved] = useState(false)
	const params = useParams();
	const url = window.location.href;
	const [reportedNode, setReportedNode] = useState()

	console.log(backTo);

	const ColoredLine = ({ color }) => (
		<hr
			style={{
				color: color,
				backgroundColor: color,
				height: 5
			}}
		/>
	);

	useEffect(() => {
		fetch(`http://localhost:8080/location/${params.locationId}`)
			.then((res) => res.json())
			.then((data) => {
				setLocation(data);
				setSingle(data);
				setLoading(false);
			})
			.catch(console.log);
	}, [])

	useEffect(() => {
		if (userSignedIn && 'userIds' in location) {
			setUserSaved(location.userIds.includes(user.id))
		}
	}, [location, userSignedIn, user])

	if (loading) {
		return null;
	}

	return (
		<>
			<Card className="border-0 rounded-0">
				<Card.Body className="pt-1 pl-0">
					<Link
						to={{
							pathname: backTo ? backTo.path : '/map',
							state
						}}
						onClick={() => zoomOutToAll()}
					>
						<Button variant="primary" size="sm">
							<CaretLeftFill /> {backTo ? backTo.text : 'Back to search results'}
						</Button>
					</Link>
				</Card.Body>
			</Card>
			<Card className="rounded-0">
				<Card.Body className="p-4 border-bottom">
					<Card.Title className="mb-1">{location.name}</Card.Title>
					<Card.Text><a href={`/organiser/${location.organiser.id}`}>{location.organiser.name}</a></Card.Text>
				</Card.Body>
				<Card.Body className="p-4 border-bottom">
					<Card.Text>
						<span className="text-muted"><TagFill /> {location.eventType}</span>
						<br />
						<span className="text-muted"><GeoAltFill /> {location.address}</span>
					</Card.Text>
				</Card.Body>

				<Card.Body className="p-4 border-bottom">
					<Card.Text>
						<small className="text-muted d-block pb-1">DESCRIPTION</small>
						<span className="text-muted">
							{location.description}
						</span>
					</Card.Text>
				</Card.Body>


				<Card.Body className="p-4">
					<EditLocationButton setLocation={setLocation} />
					<DeleteLocationButton />
					<SaveLocationButton locationId={location.id} userSaved={userSaved} />
					<ShareButton url={url} />
					<Button variant="outline-primary" size="sm" className="ml-2 mb-1"> <CompassFill />
						<a href={`https://www.google.com/maps/dir//${location.latitude},${location.longitude}`}
							target="_blank" rel="noopener noreferrer">
							Get directions</a> </Button>
					<ReportButton setLocation={setLocation} />

				</Card.Body>
				<Card.Body className="p-4 border-bottom">
					<Card.Text>
						<small className="text-muted d-block pb-1">EVENTS</small>

						<span className="text-muted">
							<GetEventsList locationId={location.id} />
						</span>

					</Card.Text>
					<ColoredLine />
					<AddEventButton locationId={location.id} />
				</Card.Body>
			</Card>
		</>
	)
}
