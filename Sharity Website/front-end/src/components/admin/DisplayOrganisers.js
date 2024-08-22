import React, { useEffect, useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { AiOutlineMail } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import OrganiserMoreDetail from "./OrganiserMoreDetails";
import { FaUserTie } from "react-icons/fa";

export default function DisplayOrganisers() {
  const [organisers, setOrganisers] = useState([]);
  const [singleOrganiser, setSingleOrganiser] = useState(null);

  const [singleUserShow, setSingleUserShow] = useState(false);
  const hideSingleUser = () => setSingleUserShow(false);
  const showSingleUser = () => setSingleUserShow(true);

  const [validateDeleteUser, setValidateDeleteUser] = useState(false);
  const hideValidateDeleteUser = () => setValidateDeleteUser(false);
  const showValidateDeleteUser = () => setValidateDeleteUser(true);

  useEffect(() => {
    fetch(`http://localhost:8080/organisers`)
      .then((res) => res.json())
      .then((data) => {
        setOrganisers(data);
        console.log(data);
      })
      .catch(console.log);
  }, []);
  const handleSubmit = (organiser) => {
    setSingleOrganiser(organiser);
    showSingleUser();
  };
  const deleteOrganiser = (organiser) => {
    fetch(`http://localhost:8080/organiser/` + organiser.id, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // for (var i = 0; i < organisers.length; i++) {
        //   if (organisers[i] === organiser) {
        //     console.log(organisers);
        //     organisers.splice(i, 1);
        //     setOrganisers(organisers);
        //     console.log(i, organisers);
        //   }
        // }
        fetch(`http://localhost:8080/organisers`)
          .then((res) => res.json())
          .then((data) => {
            setOrganisers(data);
            console.log(data);
          });
      })
      .catch(console.log);
  };

  return (
    <>
      {organisers.length === 0 ? (
        "No Organisers To Display At The Moment"
      ) : (
        <div>
          {organisers.map((organiser, index) => (
            <>
              <Card
                className="border-right-0 border-left-0 border-bottom-0 rounded-0"
                key={index}
              >
                <Row>
                  <Col>
                    <div className="m-4">
                      <Card.Title>
                        <FaUserTie />
                        {" " + organiser.name}
                      </Card.Title>
                      <Card.Text>
                        <span className="text-muted">
                          <AiOutlineMail />
                          {" " + organiser.email}
                        </span>
                        <br />
                        <span className="text-muted">
                          <IoLocationOutline />
                          {" " + organiser.address}
                        </span>
                      </Card.Text>
                    </div>
                  </Col>
                  <Col className="d-flex justify-content-center flex-column">
                    <Button
                      // size="sm"
                      className="m-2"
                      // style={{ width: "50%" }}
                      variant="primary"
                      onClick={() => handleSubmit(organiser)}
                    >
                      More details
                    </Button>
                    <Button
                      className="m-2"
                      // size=""
                      // style={{ width: "50%" }}
                      variant="danger"
                      onClick={() => {
                        showValidateDeleteUser();
                        setSingleOrganiser(organiser);
                      }}
                    >
                      Delete Organiser
                    </Button>
                  </Col>
                </Row>
              </Card>
            </>
          ))}
          {singleOrganiser !== null && (
            <OrganiserMoreDetail
              handleClose={hideSingleUser}
              show={singleUserShow}
              organiser={singleOrganiser}
            />
          )}

          <Modal
            handleClose={hideValidateDeleteUser}
            show={validateDeleteUser}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                Are you sure you want to delete this account?
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <Button onClick={() => setValidateDeleteUser(false)}>
                    Cancel
                  </Button>
                </Col>
                <Col className="d-flex justify-content-end">
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteOrganiser(singleOrganiser);
                      setValidateDeleteUser(false);
                    }}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
}
