import React from "react";
import { useState, useContext } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import AlertContext from "../../context/AlertContext";

export default function MemberSettingsForm({ user }) {
  //{organiser}

  const [name, setName] = useState(user.name);
  const [address1, setAddress1] = useState(user.address);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const createAlert = useContext(AlertContext);
  const [contactEmail, setContactEmail] = useState(user.contactEmail);
  const [contactWebsite, setContactWebsite] = useState(user.contactWebsite);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    setValidated(true);
    console.log(user);
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === true) {
      const body = new FormData();
      body.append("id", user.id);
      body.append("name", name.trim());
      body.append("address", address1.trim());
      body.append("email", email.trim());
      body.append("description", user.description);

      body.append("contactEmail", contactEmail.trim());
      body.append("contactWebsite", contactWebsite.trim());
      body.append("role", user.role);

      console.log(body);
      fetch(`http://localhost:8080/organiser`, {
        method: "post",
        body: body,
      })
        .then(function (response) {
          return response.text();
        })
        .then(function (text) {
          console.log(text);
        })
        .catch(function (error) {
          console.error(error);
        });
      createAlert("Details Updated", "success");
    } else if (form.checkValidity() === false) {
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicName">
        <Form.Label>Organisation Name:</Form.Label>
        <Form.Control
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please enter your Organisation Name.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formBasicAddress">
        <Form.Label>Address Line 1:</Form.Label>
        <Form.Control
          required
          type="text"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please enter your Address line 1
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email Address: </Form.Label>
        <Form.Control
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please enter a valid email.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Contact Email Address: </Form.Label>
        <Form.Control
          required
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please enter a valid email.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formBasicText">
        <Form.Label>Organiser Website: </Form.Label>
        <Form.Control
          required
          type="text"
          value={contactWebsite}
          onChange={(e) => setContactWebsite(e.target.value)}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please enter a valid email.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formBasicText">
        <Form.Label>User Type:</Form.Label>

        <Form.Control
          type="staticText"
          value={role}
          //   onChange={(e) => setRole(e.target.value.trim())}
          name="role"
          readOnly
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100 mt-2">
        Update
      </Button>
    </Form>
  );
}
