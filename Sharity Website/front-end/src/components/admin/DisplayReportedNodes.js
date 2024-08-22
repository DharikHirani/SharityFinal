import React, { useState, useEffect } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { IoLocationOutline } from "react-icons/io5";
import OptionsSection from "../sections/OptionsSection";
import { BiMessageAltError } from "react-icons/bi";
export default function DisplayReportedNodes() {
  const [reportedLocations, setReportedLocations] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/reportednodes`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setReportedLocations(data);
      })
      .catch(console.log);
  }, []);

  const handleResolve = (index) => {
    const locationsCopy = JSON.parse(JSON.stringify(reportedLocations));
    locationsCopy.splice(index, 1);
    setReportedLocations(locationsCopy);
  }

  return (
    <>
      {reportedLocations.length === 0 ? (
        "No Reported Nodes To Display At The Moment"
      ) : (
        <>
          {reportedLocations.map((node, index) => (
            <div
              className="d-flex justify-content-center"
              style={{ width: "100%" }}
            >
              <Card className="" style={{ width: "100%" }}>
                <Card.Body className="d-flex justify-content-between">
                  <div>
                    <Card.Title>
                      <IoLocationOutline /> {node.location.name}
                    </Card.Title>
                    <Card.Text>
                      <BiMessageAltError style={{ color: "red" }} /> {node.reportMessage}
                    </Card.Text>
                  </div>
                  <div>
                    <Button onClick={() => handleResolve(index)}>Resolve</Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </>
      )}
    </>
  );
}
