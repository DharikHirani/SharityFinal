import React, { useContext, useState } from "react";
import { Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { CheckSquare, PencilSquare, Textarea } from "react-bootstrap-icons";
import AlertContext from "../context/AlertContext";

export default function EditDescripton({ user }) {
  const [edit, setEdit] = useState(true);
  const [description, setDescription] = useState(user.description);
  console.log(user);

  const createAlert = useContext(AlertContext);
  const editDescripton = () => {
    setEdit(!edit);
  };
  const updateDescription = () => {
    setEdit(!edit);
    const body = new FormData();
    body.append("id", user.id);
    body.append("name", user.name);
    body.append("address", user.address);
    body.append("email", user.email);
    body.append("contactEmail", user.contactEmail);
    body.append("contactWebsite", user.contactWebsite);
    body.append("description", description);
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
    createAlert("Description Updated", "success");
  };
  return (
    <>
      <Row>
        <Col sm="11">
          {edit ? (
            <>
              <InputGroup>
                <Row>
                  <Col xs="11">
                    <p>{description}</p>
                  </Col>
                  <Col>
                    <InputGroup.Prepend>
                      <PencilSquare onClick={editDescripton}></PencilSquare>
                    </InputGroup.Prepend>
                  </Col>
                </Row>
              </InputGroup>
            </>
          ) : (
            <>
              <InputGroup>
                <FormControl
                  rows={3}
                  as="textarea"
                  placeholder="enter a discription"
                  aria-label="With textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={500}
                />
                <InputGroup.Prepend>
                  <CheckSquare onClick={updateDescription}></CheckSquare>
                </InputGroup.Prepend>
              </InputGroup>
              {description.length == 500 ? (
                <div>
                  Max of {description.length} characters have been reached
                </div>
              ) : (
                <div>{description.length} characters</div>
              )}
            </>
          )}
        </Col>
      </Row>
    </>
  );
}
