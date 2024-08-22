import React from "react";
import { useContext, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { PencilFill, CaretRightFill, GeoAltFill, TagFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import UserContext from './context/UserContext';
import AddEvent from '../components/forms/AddEvent';
import AddEventButton from "./AddEventButton";

export default function LocationsList({
  
  locations,
  state,
  setSingle,
  zoomInToSingle,
  backTo,
  editable = false,
  showArrow = false,
  
}) 
{
  const { userSignedIn, user } = useContext(UserContext)
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //const [show, setShow] = useState(false);

  return (
    <>
      {locations.map((location, index) => (
        <Card className="border-right-0 border-left-0 border-bottom-0 rounded-0" key={index}>
          <Card.Body className="d-flex justify-content-between align-items-start p-4">
            <div>
              <Card.Title>{location.name}</Card.Title>
              <Card.Text>
                <span className="text-muted">
                  <TagFill /> {location.eventType}
                </span>
                <br />
                <span className="text-muted">
                <GeoAltFill /> {location.address}
                </span>
              </Card.Text>
            </div>
            <div>
              {editable && (
                <Button variant="outline-primary" size="sm" className="ml-2">
                  Edit
                </Button>
              )}
              <Link
                to={{
                  pathname: `/map/${location.id}`,
                  state: { backTo, initLocations: [location], ...state }
                }}
                onClick={() => {
                  if (setSingle) setSingle(location);
                  if (zoomInToSingle) zoomInToSingle(location.latitude, location.longitude);
                }}
              >
                <Button variant="primary" size="sm" className="ml-2">
                  Details {showArrow && <CaretRightFill />}
                </Button>
   
              </Link>
              {/* &nbsp;
              &nbsp;
              &nbsp;
              {console.log(location)}
              
              <AddEventButton locationId={location.id} /> */}
              
            </div>
          </Card.Body>
        </Card>
      ))
      } 
    </>
  );
}
