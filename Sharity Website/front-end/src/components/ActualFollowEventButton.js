import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, FormControl, Modal } from 'react-bootstrap';
import { HeartFill } from 'react-bootstrap-icons';
import UserContext from './context/UserContext';
import AlertContext from './context/AlertContext';


const StatusEnum = Object.freeze({
	INIT: 1,
	LOADING: 2,
	SAVED: 3,
});

export default function ActualFollowEventButton({ userSaved, locationId, eventId }) 
{ 
	const { userSignedIn, user } = useContext(UserContext);

    const [status, setStatus] = useState(userSaved ? StatusEnum.SAVED : StatusEnum.INIT)
	const createAlert = useContext(AlertContext)

	useEffect(() => {
		setStatus(userSaved ? StatusEnum.SAVED : StatusEnum.INIT)
	}, [userSaved]);

    if (!userSignedIn || user.role !== "member") return null;

    const saveEvent = () => {
		setStatus(StatusEnum.LOADING)

		const body = new FormData();
		body.append("eventId", eventId);
		body.append("userId", user.id);

		const method = status === StatusEnum.SAVED ? 'DELETE' : 'POST'

        fetch(`http://localhost:8080/user/events/`, {
			method, body
		})
			.then(function (response) {
				if (response.status === 200) {
					setStatus(method === 'POST' ? StatusEnum.SAVED : StatusEnum.INIT)
					const message = method === 'POST' ? 'Event has been saved.' : 'Event has been removed.'
					createAlert(message, 'success')
				} else {
					setStatus(method === 'DELETE' ? StatusEnum.SAVED : StatusEnum.INIT)
					createAlert('Error occured. Try again soon.', 'danger')
				}
			})
			.catch(function () {
				setStatus(method === 'DELETE' ? StatusEnum.SAVED : StatusEnum.INIT)
				createAlert('Error occured. Try again soon.', 'danger')
			});
		}
			return (
			// <div 
			// style={{
			// 	display: "flex",
			// 	justifyContent: "center",
			// 	alignItems: "center"
			// }}>

			<Button className="mr-2" variant={status === StatusEnum.SAVED ? "primary" : "outline-primary"} size="sm" onClick={saveEvent}>
			<HeartFill /> {status === StatusEnum.INIT ? 'Follow Event' : (status === StatusEnum.LOADING ? 'Saving...' : 'Followed')}
			</Button>
		//</div>
			)
	}
