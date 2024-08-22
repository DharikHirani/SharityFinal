import React, { useEffect, useState, useContext } from "react";
import { Button, Card, Modal} from "react-bootstrap";
import FollowEventButton from './FollowEventButton';
import { useParams } from "react-router-dom";
import ActualFollowEventButton from './ActualFollowEventButton'; 

export default function MoreDetailsButton({locationId, eventId }) {

  const [show, setShow] = useState(false);
  const [events, setEvents] = useState([]);
  const [location, setLocation] = useState({})
  const params = useParams();
  const [userSaved, setUserSaved] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [title, setTitle] = useState(events.title);
  const [date, setDate] = useState(events.date);
  const [loading, setLoading] = useState(true);

  //  useEffect(() => {
  //    fetch(`http://localhost:8080/events/`)
  //      .then((res) => res.json())
  //      .then((data) => {
  //        setEvents(data);
  //        setLoading(false);
  //        console.log(eventId);
  //      })
  //      .catch(console.log);
  //  }, []);
  
    return (
            <div> 
            <Button
			
      onClick={handleShow}	
		variant="outline-primary" size="sm" className="ml-2">  More Details		
		</Button> 
    <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Event Details</Modal.Title>
          </Modal.Header>
          <Modal.Body> 
           <FollowEventButton locationId={locationId} eventId={eventId} />
      
          </Modal.Body>
          
          <Modal.Footer>
          
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal> 
            </div>
    );
  }
