import React, { useContext, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  FormControl,
  FormLabel,
  InputGroup,
  Modal,
} from "react-bootstrap";
import AlertContext from "../../context/AlertContext";
import UserContext from "../../context/UserContext";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const eye = <FontAwesomeIcon icon={faEye} />;

function DeleteAccount({ user }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showPassword, setShowPassword] = useState(true);
  const [password, setPassword] = useState("");
  const { signOut } = useContext(UserContext);

  const createAlert = useContext(AlertContext);

  const changePasswordShowType = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (e) => {
    console.log(password);
    const body = new FormData();
    body.append("id", user.id);
    body.append("password", password);

    fetch(`http://localhost:8080/member`, {
      method: "delete",
      body: body,
    })
      .then(function (response) {
        return response.status;
      })
      .then(function (data) {
        if (data == 400) {
          console.log("member password incorrect");
        } else if (data == 200) {
          console.log("member Deleted");
          createAlert("Account Deleted", "success");
          signOut();
        } else {
          fetch(`http://localhost:8080/organiser`, {
            method: "delete",
            body: body,
          })
            .then(function (response) {
              return response.status;
            })
            .then(function (data) {
              if (data == 400) {
                console.log("organiser password incorrect");
              } else if (data == 200) {
                console.log("Organiser Deleted");
                createAlert("Account Deleted", "success");
                signOut();
              } else {
                console.log(data);
              }
            })
            .catch(function (error) {});
        }
      })
      .catch(function (error) {});
  };

  return (
    <>
      <Form>
        <FormLabel>
          Est occaecat ipsum culpa ullamco dolore do do eiusmod consectetur
          aliquip aliquip non laborum. Labore dolor aliqua tempor reprehenderit
          tempor culpa id dolor. Nostrud laborum qui aliquip elit. Mollit
          adipisicing occaecat nostrud reprehenderit pariatur commodo commodo
          excepteur in labore consectetur. Cillum esse consequat sunt ea nulla.
          Do irure consectetur duis duis sit.
        </FormLabel>
        <Button variant="danger" onClick={handleShow}>
          Delete Account
        </Button>
      </Form>

      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure want to delete the account?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-2">
            <FormControl
              id="inlineFormInputGroup"
              required
              type={showPassword === true ? "password" : "text"}
              placeholder="Enter Password"
              name="password"
              onChange={(e) => setPassword(e.target.value.trim())}
            />
            <InputGroup.Prepend>
              <InputGroup.Text onClick={changePasswordShowType}>
                {eye}
              </InputGroup.Text>
            </InputGroup.Prepend>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Col className="d-flex justify-content-between px-0">
            <Button variant="success" onClick={handleClose}>
              Cancel
            </Button>

            <Button variant="danger" onClick={handleSubmit}>
              Confirm
            </Button>
          </Col>

          {/* <Alert variant="danger" dismissible>
            You Wont be Able to Recover Your Account
          </Alert> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default DeleteAccount
