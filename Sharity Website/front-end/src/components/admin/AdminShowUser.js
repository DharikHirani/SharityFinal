import React, { useState } from "react";
import OptionsSection from "../sections/OptionsSection";
import DisplayMembers from "./DisplayMembers";
import DisplayOrganisers from "./DisplayOrganisers";

export default function AdminShowUsers() {
  // const [users, setUsers] = useState("");

  const userTypes = [
    {
      title: "Members",
      content: <DisplayMembers />,
    },
    {
      title: "Organisers",
      content: <DisplayOrganisers />,
    },
  ];

  return (
    <div>
      <OptionsSection options={userTypes}></OptionsSection>
    </div>
  );
}
