import React from "react";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { AiOutlineMail } from "react-icons/ai";
import { FaUserTie } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdDateRange, MdAccessTime } from "react-icons/md";
export default function DisplayNewsLettersToPublic() {
  const [Newsletters, setNewsletters] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/newsletters`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNewsletters(data);
      })
      .catch(console.log);
  }, []);

  return (
    <div className="d-flex justify-content-center" style={{ width: "100%" }}>
      <Card className="m-5 p-3" style={{ width: "70%" }}>
        <Card.Body>
          <h1>Newsletters</h1>
          {Newsletters.map((Newsletter) => (
            <>
              <Card className="border-right-0 border-left-0 border-bottom-0 rounded-0">
                <div className="m-4">
                  <Card.Title>{" " + Newsletter.title}</Card.Title>
                  <a href={`/organiser/` + Newsletter.organiser.id}>
                    {Newsletter.organiser.name}
                  </a>
                  <Card.Body
                    dangerouslySetInnerHTML={{ __html: Newsletter.body }}
                  ></Card.Body>
                </div>
              </Card>
            </>
          ))}
        </Card.Body>
      </Card>
    </div>
  );
}
