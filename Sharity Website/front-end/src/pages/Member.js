import React, { useContext, useMemo } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
// @ts-ignore
import { EmojiAngryFill, Envelope, Link45deg } from "react-bootstrap-icons";
// @ts-ignore
import FilterPill from "../components/filter/FilterPill";
// @ts-ignore
import LocationsList from "../components/LocationsList";
import OptionsSection from "../components/sections/OptionsSection";
import TabsSection from "../components/sections/TabsSection";
import TitleSection from "../components/sections/TitleSection";
import { useMediaQuery } from "react-responsive";
// @ts-ignore
import Event from "../components/Event";
import MemberSettingsForm from "../components/forms/formComponents/MemberSettingsForm";
import UserContext from "../components/context/UserContext";
import MemberChangePassword from "../components/forms/formComponents/MemberChangePassword";
import DeleteAccount from "../components/forms/formComponents/DeleteAccount";
import Calendar from "../components/calendar/Calendar";
import "./calendarstyle.css";
// @ts-ignore
import { render } from "@testing-library/react";
import MemberSavedLocations from "../components/member/MemberSavedLocations";
import MemberSavedEvents from "../components/member/SavedEvents";

export default function Organisation() {
  const { user } = useContext(UserContext);

  const isScreenLg = useMediaQuery({
    query: "(min-width: 992px)",
  });

  const events = [
    {
      title: "Charity Event",
      description: "This is a description for a Charity Event.",
      date: "30/03/2021",
      startTime: "9:00AM",
      endTime: "3:00PM",
    },
    {
      title: "Fundraiser",
      description: "A fundraiser for Hillingdon Food Bank",
      date: "17/03/2021",
      startTime: "11:30AM",
      endTime: "6:00PM"
    },
  ];

  const settings = [
    {
      title: "Profile",
      content: (
        <Card className="border-0 p-4">
          <MemberSettingsForm user={user} />
        </Card>
      ),
    },
    {
      title: "Security",
      content: (
        <Card className="border-0 p-4">
          <MemberChangePassword user={user} />
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

  const tabs = [
    {
      title: "Saved locations",
      content: <MemberSavedLocations user={user} />,
    },
      {
      title: "Saved Events",
      content: <MemberSavedEvents user={user} />
    },
    {
      title: "Settings",
      content: <OptionsSection options={settings} />,
    },
    {
      title: "Calendar",
      content: <Calendar />,
    }
  ];

  return (
    <>
      <TitleSection>
        <h1>Welcome back, {user.firstName}</h1>
      </TitleSection>

      <TabsSection tabs={tabs} />
    </>
  );
}
