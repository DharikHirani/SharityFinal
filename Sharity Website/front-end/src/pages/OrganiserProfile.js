import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Envelope, GeoAltFill, Link45deg } from "react-bootstrap-icons";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import OrganiserLocations from "../components/orgComponents/OrganiserLocations";
import TabsSection from "../components/sections/TabsSection";
import TitleSection from "../components/sections/TitleSection";
import DisplayNewsLetters from "../components/DisplayNewsLetters";

export default function OrganiserProfile() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [organiser, setOrganiser] = useState({});
  const isScreenLg = useMediaQuery({ query: "(min-width: 992px)" });

  useEffect(() => {
    fetch(`http://localhost:8080/organiser/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrganiser(data);
        setLoading(false);
      })
      .catch(console.log);
  }, []);


  const tabs = [
    {
      title: "Locations",
      content: <OrganiserLocations organiser={organiser} />,
    },
    {
      title: "Newsletter",
      content: <DisplayNewsLetters organiser={organiser}/>,
    },
  ];

  return loading ? (
    <div>Loading...</div>
  ) : (
    <>
      <TitleSection>
        <h1>{organiser.name}</h1>

        <Row className="d-flex align-items-stretch">
          <Col lg={7} className="mt-4">
            <Card className="rounded-0 border-0">
              {/* <Card.Body> */}
              <Card.Text>
                <small className="text-muted">DESCRIPTION</small>
              </Card.Text>
              <Card.Text>{organiser.description}</Card.Text>
              {/* </Card.Body> */}
            </Card>
          </Col>
          <Col lg={5} className="mt-4">
            <Card
              className={
                (!isScreenLg ? "border-left-0" : "border-top-0") +
                " rounded-0 border-right-0 border-bottom-0 h-100"
              }
            >
              <Card.Body className={!isScreenLg ? "px-0 pt-3 pb-0" : "py-0"}>
                <>
                  <Card.Text>
                    <small className="text-muted">CONTACT</small>
                  </Card.Text>
                  <Card.Link>
                    <GeoAltFill className="mr-2" />
                    {organiser.address}
                  </Card.Link>
                  <br />
                  <Card.Link>
                    <Link45deg className="mr-2" />
                    <a href={organiser.contactWebsite}>
                      {organiser.contactWebsite}
                    </a>
                  </Card.Link>
                  <br />
                  <Card.Link>
                    <Envelope className="mr-2" />

                    <a href={"mailTo:" + organiser.email}>{organiser.email}</a>
                  </Card.Link>
                </>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </TitleSection>

      <TabsSection tabs={tabs} />
    </>
  );
}
