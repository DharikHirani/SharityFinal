import React, { useEffect, useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import MemberMoreDetails from "./MemberMoreDetails";

export default function DisplayMembers() {
  const [members, setMembers] = useState([]);
  const [singleMember, setSingleMember] = useState(null);

  const [singleUserShow, setSingleUserShow] = useState(false);
  const hideSingleUser = () => setSingleUserShow(false);
  const showSingleUser = () => setSingleUserShow(true);

  const [validateDeleteUser, setValidateDeleteUser] = useState(false);
  const hideValidateDeleteUser = () => setValidateDeleteUser(false);
  const showValidateDeleteUser = () => setValidateDeleteUser(true);

  // const [];

  useEffect(() => {
    fetch(`http://localhost:8080/members`)
      .then((res) => res.json())
      .then((data) => {
        setMembers(data);
        console.log(data);
      })
      .catch(console.log);
  }, []);

  const deleteMember = (member) => {
    fetch(`http://localhost:8080/member/` + member.id, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetch(`http://localhost:8080/members`)
          .then((res) => res.json())
          .then((data) => {
            setMembers(data);
          });
      })
      .catch(console.log);
  };

  const handleSubmit = (member) => {
    setSingleMember(member);
    showSingleUser();
  };
  return (
    <>
      {members.length === 0 ? (
        "No Members To Display At The Moment"
      ) : (
        <div>
          {members.map((member, index) => (
            <>
              <Card
                className="border-right-0 border-left-0 border-bottom-0 rounded-0"
                key={index}
              >
                <Row>
                  <Col>
                    <div className="m-4">
                      <Card.Title>
                        <FaUserAlt />
                        {" " + member.firstName + " " + member.lastName}
                      </Card.Title>
                      <Card.Text>
                        <span className="text-muted">
                          <AiOutlineMail />
                          {" " + member.email}
                        </span>
                      </Card.Text>
                    </div>
                  </Col>
                  <Col className="d-flex justify-content-center flex-column">
                    <Button
                      className="m-1"
                      variant="primary"
                      onClick={() => handleSubmit(member)}
                    >
                      More details
                    </Button>
                    <Button
                      className="m-1"
                      variant="danger"
                      onClick={() => {
                        showValidateDeleteUser();
                        setSingleMember(member);
                      }}
                      // deleteMember(member)
                    >
                      Delete Member
                    </Button>
                  </Col>
                </Row>
              </Card>
            </>
          ))}
          {singleMember !== null && (
            <MemberMoreDetails
              handleClose={hideSingleUser}
              show={singleUserShow}
              member={singleMember}
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
                  {" "}
                  <Button onClick={() => setValidateDeleteUser(false)}>
                    Cancel
                  </Button>
                </Col>
                <Col className="d-flex justify-content-end">
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteMember(singleMember);
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
