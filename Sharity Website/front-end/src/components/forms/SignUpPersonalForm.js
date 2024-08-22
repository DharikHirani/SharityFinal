import React, { useState, useContext } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AlertContext from "../context/AlertContext";
const eye = <FontAwesomeIcon icon={faEye} />;

const StatusEnum = Object.freeze({
  INIT: 1,
  LOADING: 2,
  SUCCESS: 3,
});

const initialFormData = {
  firstname: "",
  lastname: "",
  email: "",
};

export default function SignUpPersonalForm() {
  const [formData, updateFormData] = React.useState(initialFormData);
  const [validated, setValidated] = useState(false);
  const [password, setPassword] = useState("");
  const [rpassword, setRpassword] = useState("");
  const createAlert = useContext(AlertContext);
  const [showPassword, setShowPassword] = useState(true);
  const [showRpassword, setShowRpassword] = useState(true);
  const [status, setStatus] = useState(StatusEnum.INIT);

  if (status === StatusEnum.SUCCESS) {
    window.location.href = "/login";
  }

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handlePassword = (e) => {
    setPassword(e.target.value.trim())
  }

  const handleRPassword = (e) => {
    setRpassword(e.target.value.trim())
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    // } else if (form.checkValidity() === true) {
    //   window.location.href = "/login";
    // }

    setValidated(true);
    event.preventDefault();
    console.log(formData);
    if (form.checkValidity() === true) {
      const body = new FormData();
      body.append("firstname", formData.firstname);
      body.append("lastname", formData.lastname);
      body.append("email", formData.email);
      body.append("password", password);

      setStatus(StatusEnum.LOADING);

      fetch(`http://localhost:8080/membersignup`, {
        method: "post",
        body: body,
      })
        .then(function (response) {
          return response.text();
        })
        .then(function (data) {
          console.log(data);
          setStatus(StatusEnum.SUCCESS);
          createAlert("Signed up!", "success")
        })
        .catch(function (error) {
          console.error(error);
          setStatus(StatusEnum.INIT);
          createAlert("Error. Try again.", "danger");
        });
    }
    else if (password !== rpassword) {
      setValidated(false)
      createAlert("Password mismatch.", "danger");
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter first name"
          name="firstname"
          onChange={handleChange}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please enter your first name.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBasicName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter last name"
          name="lastname"
          onChange={handleChange}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please enter your last name.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address </Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="Enter email"
          name="email"
          onChange={handleChange}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please enter a valid email.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <label>Password</label>
        <InputGroup className="mb-2">
          <Form.Control
            required
            type={showPassword === true ? "password" : "text"}
            placeholder="Password"
            value={password}
            onChange={handlePassword}
          />
          <InputGroup.Prepend>
            <InputGroup.Text onClick={() => setShowPassword(!showPassword)}>
              {eye}
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please enter your password.
        </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <label>Repeat Password</label>
        <InputGroup className="mb-2">
          <Form.Control
            required
            type={showRpassword === true ? "password" : "text"}
            placeholder="Password again"
            value={rpassword}
            onChange={handleRPassword}
          />
          <InputGroup.Prepend>
            <InputGroup.Text onClick={() => setShowRpassword(!showRpassword)}>
              {eye}
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please repeat your password.
        </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check
          required
          feedback="You must agree before submitting."
          type="checkbox"
          label="Accept some terms"
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100 mt-2">
        {status === StatusEnum.LOADING ? "Loading..." : "Sign Up"}
      </Button>
    </Form>
  );
}
