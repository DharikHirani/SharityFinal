import React, { useContext, useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import AlertContext from "../context/AlertContext";
import UserContext from "../context/UserContext";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const eye = <FontAwesomeIcon icon={faEye} />;

const StatusEnum = Object.freeze({
  INIT: 1,
  LOADING: 2,
  SUCCESS: 3,
});

const initialFormData = {
  email: "",
  password: "",
};

export default function LoginForm({ sourcePath }) {
  const [formData, updateFormData] = React.useState(initialFormData);
  const [status, setStatus] = useState(StatusEnum.INIT);
  const { signIn } = useContext(UserContext);
  const createAlert = useContext(AlertContext);
  const [showPassword, setShowPassword] = useState(true);

  if (status === StatusEnum.SUCCESS) {
    const target = sourcePath || "/profile";
    return <Redirect to={target} />;
  }

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const body = new FormData();
    body.append("email", formData.email);
    body.append("password", formData.password);

    setStatus(StatusEnum.LOADING);

    fetch(`http://localhost:8080/user/sign-in`, {
      method: "post",
      body: body,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        signIn(data);
        setStatus(StatusEnum.SUCCESS);
        createAlert("You signed in successfully!", "success");
      })
      .catch(function () {
        setStatus(StatusEnum.INIT);
        createAlert("Incorrect email or password. Try again.", "danger");
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
        />
      </Form.Group>

      <InputGroup className="mb-2">
        <FormControl
          id="inlineFormInputGroup"
          required
          type={showPassword === true ? "password" : "text"}
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <InputGroup.Prepend>
          <InputGroup.Text onClick={() => setShowPassword(!showPassword)}>
            {eye}
          </InputGroup.Text>
        </InputGroup.Prepend>
      </InputGroup>

      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Remember me" />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        className="w-100 mt-2"
        onClick={handleSubmit}
      >
        {status === StatusEnum.LOADING ? "Loading..." : "Sign In"}
      </Button>
    </Form>
  );
}
