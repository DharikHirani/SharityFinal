import React from "react";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { AiOutlineMail } from "react-icons/ai";
import { FaUserTie } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdDateRange, MdAccessTime } from "react-icons/md";
export default function DisplayEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/events`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEvents(data);
      })
      .catch(console.log);
  }, []);

  return (
    <div className="d-flex justify-content-center" style={{ width: "100%" }}>
      <Card className="m-5 p-3" style={{ width: "70%" }}>
        <Card.Body>
          <h1>Events</h1>
          {events.map((event) => (
            <>
              <Card className="border-right-0 border-left-0 border-bottom-0 rounded-0">
                <div className="m-4">
                  <Row>
                    <Col>
                      <Card.Title>{" " + event.title}</Card.Title>
                      <a href={`/map/` + event.location.id}>
                        {event.location.name}
                      </a>
                    </Col>
                    <Col>
                      <span className="text-muted d-flex justify-content-end"></span>
                      <span className="text-muted d-flex justify-content-end">
                        <MdDateRange /> {event.date}
                      </span>
                      <span className="text-muted d-flex justify-content-end">
                        <MdAccessTime />
                        {" " + event.startTime + " -" + event.endTime}
                      </span>
                    </Col>
                  </Row>
                  <Card.Text>
                    <span className="text-muted">
                      {" " + event.description}
                    </span>
                    <span className="text-muted"></span>
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
