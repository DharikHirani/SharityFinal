import React from "react";
import { useState, useContext } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
// import VarifyUser from "./VarifyUser";
import AlertContext from "../../context/AlertContext";

export default function MemberSettingsForm({ user }) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState("Member");
  const createAlert = useContext(AlertContext);

  // const [varifyUser, setVarifyUser] = useState(false);
  const [validated, setValidated] = useState(false);
  // const [isPasswordValid, setIsPasswordValid] = useState(null);

  const handleSubmit = (event) => {
    setValidated(true);
    // setVarifyUser(true);
    const form = event.currentTarget;
    event.preventDefault();
    // console.log(form.checkValidity(), isPasswordValid);
    if (form.checkValidity() === true) {
      //&& isPasswordValid === true
      // setVarifyUser(false);
      const body = new FormData();
      body.append("id", user.id);
      body.append("firstname", firstName);
      body.append("lastname", lastName);
      body.append("email", email);
      body.append("role", user.role);
      console.log(user.id, firstName, lastName, email, user.role);

      fetch(`http://localhost:8080/member`, {
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
      // setIsPasswordValid(null);
    } else if (form.checkValidity() === false) {
      // setVarifyUser(false);
    }
  };

  return (
    // <>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Group controlId="formBasicName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              type="text"
              value={firstName}
              name="firstname"
              onChange={(e) => setFirstName(e.target.value.trim())}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please enter your first name.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formBasicName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              type="text"
              value={lastName}
              name="lastname"
              onChange={(e) => setLastName(e.target.value.trim())}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please enter your last name.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address </Form.Label>
        <Form.Control
          required
          type="email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value.trim())}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please enter a valid email.
        </Form.Control.Feedback>
      </Form.Group>

      {/* <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder={password}
            name="password"
            onChange={(e) => setPassword(e.target.value.trim())}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please enter your password.
          </Form.Control.Feedback>
        </Form.Group> */}

      <Form.Group controlId="formBasicText">
        <Form.Label>User Type:</Form.Label>

        <Form.Control
          type="staticText"
          value={role}
          onChange={(e) => setRole(e.target.value.trim())}
          name="role"
          // plaintext
          readOnly
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100 mt-2">
        Update
      </Button>
    </Form>

    //    <VarifyUser
    //     setIsPasswordValid={setIsPasswordValid}
    //     userPassword={password}
    //     show={varifyUser}
    //     onHide={() => setVarifyUser(false)}
    //   />
    //  </>
  );
}
