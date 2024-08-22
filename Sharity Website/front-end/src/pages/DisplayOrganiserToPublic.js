import React, { useEffect, useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { AiOutlineMail } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";

export default function DisplayOrganisersToPublic() {
  const [organisers, setOrganisers] = useState([]);
  const [singleOrganiser, setSingleOrganiser] = useState(null);

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
  };

  return (
    <div className="d-flex justify-content-center" style={{ width: "100%" }}>
      <Card className="m-5 p-3" style={{ width: "70%" }}>
        <Card.Body>
          {/* style={{ width: "100%" }} */}
          <h1>Organisers</h1>
          {organisers.map((organiser, index) => (
            <>
              <Card
                className="border-right-0 border-left-0 border-bottom-0 rounded-0"
                key={index}
              >
                <div className="m-4">
                  <Row>
                    <Col>
                      <Card.Title>
                        <FaUserTie />
                        {" " + organiser.name}
                      </Card.Title>
                    </Col>
                    <Col className="d-flex justify-content-end">
                      <Button
                        size="sm"
                        variant="primary"
                        href={"/organiser/" + organiser.id}
                        onClick={() => handleSubmit(organiser)}
                      >
                        Show Profile
                      </Button>
                    </Col>
                  </Row>
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
              </Card>
            </>
          ))}
        </Card.Body>
      </Card>
    </div>
  );
}
