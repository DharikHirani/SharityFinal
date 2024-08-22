import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function OrganiserRequestDialog({ show }) {

  return (
    <>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Request Successfully Sent</Modal.Title>
        </Modal.Header>
        <Modal.Body>Authorisation request sent to admin, please check your <b>email</b> to see if you've been authorised before signing in!</Modal.Body>
        <Modal.Footer>
          <Link to="/home">
            <Button variant="primary">Understood!</Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}