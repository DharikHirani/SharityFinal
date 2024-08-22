import React, { useContext } from "react";
import { Card, CardImg, Modal, Button } from "react-bootstrap";
import AlertContext from "../components/context/AlertContext";

export default function NewsLetterPreview({
  user,
  show,
  close,
  newsletterBody,
  newsletterTitle,
}) {
  const createAlert = useContext(AlertContext);

  const handleSubmit = () => {
    const body = new FormData();
    body.append("title", newsletterTitle);
    body.append("body", newsletterBody);
    body.append("id", user.id);

    console.log(body);
    fetch(`http://localhost:8080/addNewsLetter`, {
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
    createAlert("NewsLetter Succesfully Created", "success");
    close();
    window.location.reload();
  };
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={close}
      size="xl"
      //   backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Preview</Modal.Title>
      </Modal.Header>

      <Card className="border-0 p-4">
        <Card.Title>{newsletterTitle}</Card.Title>
        <Card.Body>
          {/* <Card.Title>hello</Card.Title> */}
          <Card.Text>
            <div dangerouslySetInnerHTML={{ __html: newsletterBody }}></div>
          </Card.Text>

          <Button onClick={handleSubmit} size="lg" block>
            Publish
          </Button>
        </Card.Body>
      </Card>
    </Modal>
  );
}
