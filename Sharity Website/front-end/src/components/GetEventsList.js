import React, { useEffect, useState, useContext } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import FollowEventButton from "../components/FollowEventButton";
import { useParams } from "react-router-dom";
import MoreDetailsButton from "./MoreDetailsButton";

export default function GetEventsList({ locationId, locations, eventId }) {
  const [show, setShow] = useState(false);
  const [events, setEvents] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/location/${locationId}/events`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
        console.log(data);
      })
      .catch(console.log);
  }, []);

  console.log(events);

  return (
    <>
      {events.map((events, index) => (
        <Card
          className="border-right-0 border-left-0 border-bottom-0 rounded-0"
          key={index}
        >
          <Card.Body className="d-flex justify-content-between align-items-start p-4">
            <div>
              <Card.Text>
                <span className="text-muted">Name: {events.title}</span>
                <br />
                <span className="text-muted">Date: {events.date}</span>
                <br />
                <span className="text-muted">
                  People Attending: {events.attendance}
                </span>
              </Card.Text>
              {/* <Button
			
      onClick={handleShow}	
		variant="outline-primary" size="sm" className="ml-2">  More Details 		
		</Button> 
    <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Event Details</Modal.Title>
          </Modal.Header>
          <Modal.Body> 
           <FollowEventButton locationId={locationId} />
        
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>  */}
              <MoreDetailsButton eventId={events.id} />
            </div>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}
