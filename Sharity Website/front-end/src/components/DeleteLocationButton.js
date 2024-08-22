import React, { useContext, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { useParams } from 'react-router-dom';
import AlertContext from './context/AlertContext';
import UserContext from './context/UserContext';

const StatusEnum = Object.freeze({
	INIT: 1,
	LOADING: 2,
	SUCCESS: 3,
});

export default function DeleteLocationButton() {
    const params = useParams();
    const createAlert = useContext(AlertContext);
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState(StatusEnum.INIT);
    const { userSignedIn, user } = useContext(UserContext);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (!userSignedIn || user.role === "member") return null;

    const del = () =>{
      fetch(`http://localhost:8080/location/${params.locationId}`, {
        method: "delete",
        })
        .then(function (response) {
          return response.status;
        })
        .then(function (data) {
          console.log(data);
          setStatus(StatusEnum.SUCCESS);
          createAlert("Location Deleted", "success")
          window.location.href = `/map`;
        })
        .catch(function (error) {
          console.log(error)
          setStatus(StatusEnum.INIT);
          createAlert("Error. Try again.", "danger");
        });
        
  }
  
    return (
      <>
        <Button  onClick={handleShow} variant="outline-primary" size="sm" className="ml-2 mb-1"><Trash /> Delete </Button>
 
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Location</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this location?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={del}>
              Confirm Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  