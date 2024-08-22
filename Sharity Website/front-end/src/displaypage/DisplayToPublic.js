import React from "react";
import DisplayEvents from "../components/DisplayEvents";
import DisplayNewsLetter from "../components/DisplayNewsLetters";
import DisplayOrganisersToPublic from "../pages/DisplayOrganiserToPublic";
import DisplayNewsLettersToPublic from "./DisplayNewsletterToPublic";

export default function DisplayToPublic() {
  return (
    <>
      <DisplayOrganisersToPublic />
      <DisplayEvents></DisplayEvents>
      <DisplayNewsLettersToPublic />
    </>
  );
}
