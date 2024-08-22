import React, { useContext, useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { Envelope, Link45deg } from "react-bootstrap-icons";
import FilterPill from "../components/filter/FilterPill";
import LocationsList from "../components/LocationsList";
import OptionsSection from "../components/sections/OptionsSection";
import TabsSection from "../components/sections/TabsSection";
import TitleSection from "../components/sections/TitleSection";
import { useMediaQuery } from "react-responsive";
import DeleteAccount from "../components/forms/formComponents/DeleteAccount";
import OrganiserChangePassword from "../components/forms/formComponents/OrganiserChangePassword";
import OrganiserSettingForm from "../components/forms/formComponents/OrganiserSettingForm";
import UserContext from "../components/context/UserContext";

// import RichTextEditor from "../components/RichTextEditor";
import EditDiscripton from "../components/orgComponents/EditDiscripton";
import EditContactDetails from "../components/orgComponents/EditContactDetails";
import RichTextEditor from "../components/RichTextEditor";
import { useEffect } from "react";

//import {NavigationContainer} from '@react-navigation/native';
//import {createStackNavigator} from '@react-navigation/stack';

export default function Organisation() {
  const { user } = useContext(UserContext);
  const [locations, setLocations] = useState([]);
  console.log(user);

  useEffect(() => {
    fetch(`http://localhost:8080/organiser/${user.id}/locations`)
      .then((res) => res.json())
      .then((data) => {
        setLocations(data);
        console.log(data);
      })
      .catch(console.log);
  }, []);
  console.log(locations);

  const settings = [
    {
      title: "Profile",
      content: (
        <Card className="border-0 p-4">
          <OrganiserSettingForm user={user}></OrganiserSettingForm>
        </Card>
      ),
    },
    {
      title: "Security",
      content: (
        <Card className="border-0 p-4">
          <OrganiserChangePassword user={user}></OrganiserChangePassword>
        </Card>
      ),
    },
    {
      title: "Delete Account",
      content: (
        <Card className="border-0 p-4">
          <DeleteAccount user={user}></DeleteAccount>
        </Card>
      ),
    },
  ];

  const isScreenLg = useMediaQuery({
    query: "(min-width: 992px)",
  });

  const tabs = [
    {
      title: "Locations",
      content: (
        <Row className="d-flex justify-content-center">
          <Col lg={4} className="mb-3">
            <Card className="rounded-0 mb-3">
              <Card.Body>
                <Card.Text className="mb-0">
                  You have {locations.length} registered locations.
                </Card.Text>
                <FilterPill>Type: All</FilterPill>
              </Card.Body>
            </Card>
            <Button variant="primary" size="sm" className="w-100">
              Show on the map
            </Button>
          </Col>
          <Col lg={8}>
            <Card className="rounded-0 border-top-0">
              <LocationsList locations={locations} />
            </Card>
          </Col>
        </Row>
      ),
    },
    {
      title: "Newsletter", // work on the publishing aspect of newsletter, have an article send over to News Letter section
      content: <RichTextEditor user={user}></RichTextEditor>,
    },
    {
      title: "Options",
      content: <OptionsSection options={settings} />,
    },
  ];

  return (
    <>
      <TitleSection>
        <h1>Organisation</h1>

        <Row className="d-flex align-items-stretch">
          <Col lg={7} className="mt-4">
            <Card className="rounded-0 border-0">
              {/* <Card.Body> */}
              <Card.Text>
                <small className="text-muted">DESCRIPTION</small>
              </Card.Text>
              <EditDiscripton user={user} />
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
                <EditContactDetails user={user} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </TitleSection>

      <TabsSection tabs={tabs} />
    </>
  );
}
