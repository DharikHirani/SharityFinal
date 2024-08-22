import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Newspaper } from 'react-bootstrap-icons';
import AlertContext from './context/AlertContext';
import UserContext from './context/UserContext';

const StatusEnum = Object.freeze({
	INIT: 1,
	LOADING: 2,
	SAVED: 3
})

export default function SubscribeNewsletterButton({userSaved, organiserId}) {
	const { userSignedIn, user } = useContext(UserContext)
	const [status, setStatus] = useState(userSaved ? StatusEnum.SAVED : StatusEnum.INIT)
	const createAlert = useContext(AlertContext)

	useEffect(() => {
		setStatus(userSaved ? StatusEnum.SAVED : StatusEnum.INIT)
	}, [userSaved]);

	if (!userSignedIn || user.role === "organiser") return null;

	const saveNewsletter = () => {
		setStatus(StatusEnum.LOADING)

		const body = new FormData();
		body.append("organiserId", organiserId);
		body.append("userId", user.id);

		const method = status === StatusEnum.SAVED ? 'DELETE' : 'POST'

		fetch(`http://localhost:8080/user/newsletter`, {
			method, body
		})
			.then(function (response) {
				if (response.status === 200) {
					setStatus(method === 'POST' ? StatusEnum.SAVED : StatusEnum.INIT)
					const message = method === 'POST' ? 'Subscribed to Newsletters.' : 'Unsubscribed from Newsletters.'
					createAlert(message, 'success')
				} else {
					setStatus(method === 'DELETE' ? StatusEnum.SAVED : StatusEnum.INIT)
					createAlert('Error occured. Try again soon.', 'danger')
				}
			})
			.catch(function (error) {
				setStatus(method === 'DELETE' ? StatusEnum.SAVED : StatusEnum.INIT)
				createAlert('Error occured. Try again soon.', 'danger')
				console.log(error)
			});
	}

	return (
		<Button className="mr-2" variant={status === StatusEnum.SAVED ? "primary" : "outline-primary"} size="sm" onClick={saveNewsletter}>
			<Newspaper /> {status === StatusEnum.INIT ? 'Subscribe' : (status === StatusEnum.LOADING ? 'Subscribing...' : 'Subscribed')}
		</Button>
	)
}