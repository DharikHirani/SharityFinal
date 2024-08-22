import React from "react";
import OrganiserRequests from "../components/admin/OrganiserRequests";
import TabsSection from "../components/sections/TabsSection";
import TitleSection from "../components/sections/TitleSection";
import AdminShowUsers from "../components/admin/AdminShowUser";
import DisplayReportedNodes from "../components/admin/DisplayReportedNodes";

export default function Admin() {
  const tabs = [
    {
      title: "Authorisation requests",
      content: <OrganiserRequests />,
    },
    {
      title: "Show Users",
      content: <AdminShowUsers />,
    },
    {
      title: "Reported Loctions",
      content: <DisplayReportedNodes />,
    },
  ];
  return (
    <>
      <TitleSection>
        <h1>Admin section</h1>
      </TitleSection>
      <TabsSection tabs={tabs} />
    </>
  );
}
