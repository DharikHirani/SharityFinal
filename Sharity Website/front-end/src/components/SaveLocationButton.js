import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { HeartFill } from 'react-bootstrap-icons';
import AlertContext from './context/AlertContext';
import UserContext from './context/UserContext';

const StatusEnum = Object.freeze({
	INIT: 1,
	LOADING: 2,
	SAVED: 3
})

export default function SaveLocationButton({ locationId, userSaved }) {
	const { userSignedIn, user } = useContext(UserContext)

	const [status, setStatus] = useState(userSaved ? StatusEnum.SAVED : StatusEnum.INIT)
	const createAlert = useContext(AlertContext)

	useEffect(() => {
		setStatus(userSaved ? StatusEnum.SAVED : StatusEnum.INIT)
	}, [userSaved]);

	if (!userSignedIn || user.role !== "member") return null;

	const saveLocation = () => {
		setStatus(StatusEnum.LOADING)

		const body = new FormData();
		body.append("locationId", locationId);
		body.append("userId", user.id);

		const method = status === StatusEnum.SAVED ? 'DELETE' : 'POST'

		fetch(`http://localhost:8080/user/location`, {
			method, body
		})
			.then(function (response) {
				if (response.status === 200) {
					setStatus(method === 'POST' ? StatusEnum.SAVED : StatusEnum.INIT)
					const message = method === 'POST' ? 'Location has been saved.' : 'Location has been removed.'
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
		<Button className="mb-1" variant={status === StatusEnum.SAVED ? "primary" : "outline-primary"} size="sm" onClick={saveLocation}>
			<HeartFill /> {status === StatusEnum.INIT ? 'Save' : (status === StatusEnum.LOADING ? 'Saving...' : 'Saved')}
		</Button>
	)
}