import React, { useContext, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import {
  CheckSquare,
  Envelope,
  Link45deg,
  PencilSquare,
  Textarea,
} from "react-bootstrap-icons";
import AlertContext from "../context/AlertContext";

export default function EditContactDetails({ user }) {
  const [edit, setEdit] = useState(true);
  const [contactEmail, setContactEmail] = useState(user.contactEmail);
  const [contactWebsite, setContactWebsite] = useState(user.contactWebsite);
  const mailURL = "mailTo:" + contactEmail;
  const createAlert = useContext(AlertContext);

  // const editDetails = () => {
  //   setEdit(!edit);
  // };
  // const updateDetails = () => {
  //   // create a post request to update discription
  //   createAlert("Diescription Updated", "success");
  //   setEdit(!edit);
  // };

  return (
    <>
      <Card.Text>
        <small className="text-muted">CONTACT</small>
      </Card.Text>
      <Card.Link>
        <Link45deg className="mr-2" />
        <a href={contactWebsite}>{contactWebsite}</a>
      </Card.Link>
      <br />
      <Card.Link>
        <Envelope className="mr-2" />
        <a href={mailURL}>{contactEmail}</a>
      </Card.Link>
    </>
  );
}
