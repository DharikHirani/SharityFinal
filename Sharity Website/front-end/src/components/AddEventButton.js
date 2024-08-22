import React, { useState } from 'react';
import { useContext } from "react";
import UserContext from './context/UserContext';
import { Button, Modal } from 'react-bootstrap';
import AddEvent from '../components/forms/AddEvent';
import { Link } from "react-router-dom";

export default function AddEventButton({locationId }) {

//const [locations, setLocations] = useState([]);
const { userSignedIn, user } = useContext(UserContext);
const [location, setLocation] = useState();
const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(locationId)
if (!userSignedIn || user.role !== "organiser") return null;


// const getLocation = () =>{
//   fetch(`http://localhost:8080/location/${location.Id}`)
//     .then((res) => res.json())
//     .then((data) => {
//       setLocation(data);
//     })
//     .catch(console.log);
// }

    return (
	<>
            
 <Button onClick={handleShow} variant="outline-primary" size="sm" className="ml-2">Add Event</Button>
             
             <Modal
               aria-labelledby="contained-modal-title-vcenter"
               centered
               show={show}
               onHide={handleClose}
               backdrop="static"
               keyboard={false}
             >
               <Modal.Header closeButton>
                 <Modal.Title>Add An Event To This Location</Modal.Title>
               </Modal.Header>
       
           {/* <Form noValidate validated={validated} onSubmit={handleSubmit} > */}
             <Modal.Body> 
                   
               <AddEvent locationId ={locationId} /> 
                   </Modal.Body>
                   <Modal.Footer>
                   <Button variant="secondary" onClick={handleClose}>
                     Close
                   </Button>
                 </Modal.Footer>
           </Modal>
            </>
    )
}