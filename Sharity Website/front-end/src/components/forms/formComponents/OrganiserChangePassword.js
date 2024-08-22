import React from "react";
import { useContext, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import AlertContext from "../../context/AlertContext";

export default function OrganiserChangePassword({ user }) {
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const createAlert = useContext(AlertContext);

  const changePasswordShowType = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (event) => {
    setValidated(true);
    const form = event.currentTarget;
    event.preventDefault();
    console.log(form.checkValidity(), newPassword, reEnterPassword);
    if (
      form.checkValidity() === true &&
      newPassword === reEnterPassword &&
      newPassword !== null
    ) {
      const body = new FormData();
      body.append("id", user.id);
      body.append("name", user.name);
      body.append("address", user.address);
      body.append("email", user.email);
      body.append("contactEmail", user.contactEmail);
      body.append("contactWebsite", user.contactWebsite);
      body.append("role", user.role);
      body.append("description", user.description);
      body.append("password", newPassword);
      console.log(user.id);
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
      createAlert("Password Updated", "success");
    } else if (newPassword !== reEnterPassword) {
      createAlert("Password do not match", "danger");
    }
  };

  return (
    // <>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicText">
        <Form.Label>New Password</Form.Label>
        <Form.Control
          required
          type={showPassword === true ? "password" : "text"}
          value={newPassword}
          name="password"
          onChange={(e) => setNewPassword(e.target.value.trim())}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please enter a new password.
        </Form.Control.Feedback>
      </Form.Group>{" "}
      <Form.Group controlId="formBasicText">
        <Form.Label>Re-Enter Password</Form.Label>
        <Form.Control
          required
          type={showPassword === true ? "password" : "text"}
          value={reEnterPassword}
          onChange={(e) => setReEnterPassword(e.target.value.trim())}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please re-enter the password.
        </Form.Control.Feedback>
      </Form.Group>
      <Button onClick={changePasswordShowType} className="w-100 mt-2">
        Show Password
      </Button>
      <Button variant="primary" type="submit" className="w-100 mt-2">
        Change Password
      </Button>
    </Form>
  );
}
