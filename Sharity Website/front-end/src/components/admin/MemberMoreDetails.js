import React from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { AiOutlineMail } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";

export default function MemberMoreDetails({ show, handleClose, member }) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {member.firstName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Body>
            <div>
              <span>
                <FaUserAlt /> {" " + member.firstName + " " + member.lastName}
              </span>

              <br></br>
              <span>
                <AiOutlineMail />
                {" " + member.email}
              </span>
            </div>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
}
