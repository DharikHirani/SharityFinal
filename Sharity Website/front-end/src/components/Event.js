import React from "react";
import { Card, CardImg } from "react-bootstrap";

export default function Event({ eventName, eventImage, eventDiscription }) {
  return (
    <Card style={{ width: "253px" }}>
      <CardImg src={eventImage} alt="Event Image"></CardImg>
      <Card.Body>
        <Card.Title>{eventName}</Card.Title>
        <p dangerouslySetInnerHTML={{ __html: eventDiscription }}></p>
      </Card.Body>
    </Card>
  );
}
