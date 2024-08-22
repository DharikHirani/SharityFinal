import React, { useContext, useEffect, useState } from 'react';
import UserContext from './context/UserContext';
import { useParams } from 'react-router-dom';
import AlertContext from './context/AlertContext';
import ActualFollowEventButton from './ActualFollowEventButton';

const StatusEnum = Object.freeze({
	INIT: 1,
	LOADING: 2,
	SAVED: 3,
});

export default function FollowEventButton({ locationId, eventId }) {
   
	const [show, setShow] = useState(false);
	const { userSignedIn, user } = useContext(UserContext);
	const [events, setEvents] = useState([]);
	const [event, setEvent] = useState([]);
	const [loading, setLoading] = useState(true);
	const params = useParams();
	const [userSaved, setUserSaved] = useState(false)

    const [status, setStatus] = useState(userSaved ? StatusEnum.SAVED : StatusEnum.INIT)
	const createAlert = useContext(AlertContext)
	

	 useEffect(() => {
	 	fetch(`http://localhost:8080/events/${eventId}`)
	 	  .then((res) => res.json())
	 	  .then((data) => {
	 		setEvents(data);
	 		setLoading(false);
			console.log(data)
	 	  })
	 	  .catch(console.log);
	   }, []);

	   console.log(events)

	   useEffect(() => {
		if (userSignedIn && 'userIds' in event) {
			setUserSaved(event.userIds.includes(user.id))
		}
	}, [event, userSignedIn, user])

	if (loading) {
		return null;
	}

	// useEffect(() => {
	// 	setStatus(userSaved ? StatusEnum.SAVED : StatusEnum.INIT)
	// }, [userSaved]);

    // if (!userSignedIn || user.role !== "member") return null;

    // const saveEvent = () => {
	// 	setStatus(StatusEnum.LOADING)

	// 	const body = new FormData();
	// 	body.append("eventId", eventId);
	// 	body.append("userId", user.id);

	// 	const method = status === StatusEnum.SAVED ? 'DELETE' : 'POST'
		
	// 	if (!userSignedIn || user.role !== "member") {return null;} 

    //     fetch(`http://localhost:8080/user/events/`, {
	// 		method, body
	// 	})
	// 		.then(function (response) {
	// 			if (response.status === 200) {
	// 				setStatus(method === 'POST' ? StatusEnum.SAVED : StatusEnum.INIT)
	// 				const message = method === 'POST' ? 'Event has been saved and added to calendar.' : 'Event has been removed.'
	// 				createAlert(message, 'success')
	// 			} else {
	// 				setStatus(method === 'DELETE' ? StatusEnum.SAVED : StatusEnum.INIT)
	// 				createAlert('Error occured. Try again soon.', 'danger')
	// 			}
	// 		})
	// 		.catch(function () {
	// 			setStatus(method === 'DELETE' ? StatusEnum.SAVED : StatusEnum.INIT)
	// 			createAlert('Error occured. Try again soon.', 'danger')
	// 		});

	// }

    return (

		  <div>
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
			<br />
			{/* <div 
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center"
			}}
			>
			<Button className="mr-2" variant={status === StatusEnum.SAVED ? "primary" : "outline-primary"} size="sm" onClick={saveEvent}>
			<HeartFill /> {status === StatusEnum.INIT ? 'Follow Event' : (status === StatusEnum.LOADING ? 'Saving...' : 'Followed')}
			</Button> */}
			<div 
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center"
			}}>
			<ActualFollowEventButton eventId={eventId} userSaved={userSaved}/>
			</div>
		</div>
		//</div>
	)
}