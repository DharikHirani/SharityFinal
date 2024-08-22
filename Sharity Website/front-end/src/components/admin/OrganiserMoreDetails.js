import React from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { AiOutlineMail } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import { BsLink45Deg } from "react-icons/bs";
import { GrMapLocation } from "react-icons/gr";

export default function OrganiserMoreDetails({ show, handleClose, organiser }) {
  console.log("line 10 ", organiser);
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
          {organiser.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Body>
            <div>
              <span>
                <IoLocationOutline />
                {" " + organiser.address}
              </span>{" "}
              <br></br>
              <span>
                <AiOutlineMail /> {" " + organiser.email}
              </span>
              <br></br>
              {organiser.contactEmail === null ? (
                <span>
                  <BiMailSend />
                  {" Contact Email not added "}
                </span>
              ) : (
                <span>
                  <BiMailSend /> {" " + organiser.contactEmail}{" "}
                </span>
              )}
              <br></br>
              {organiser.contactWebsite === null ? (
                <span>
                  <BiMailSend />
                  {" Contact Webisite not added "}
                </span>
              ) : (
                <span>
                  <BsLink45Deg />
                  {" " + organiser.contactWebsite}{" "}
                </span>
              )}
              <br></br>
              {organiser.locationsCount === 1 ? (
                <span>
                  <GrMapLocation />{" "}
                  {organiser.locationsCount + " location added on map"}
                </span>
              ) : (
                <span>
                  <GrMapLocation />{" "}
                  {organiser.locationsCount + " locations added on map"}
                </span>
              )}
            </div>

            {/* <br />

              {"Organisation Contact Website: " + }
              <br />
              {"Organisation's Locations created: " + } */}
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
}
