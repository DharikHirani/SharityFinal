import React, { useEffect, useState } from "react";
import { Marker, Popup, useMapEvent } from "react-leaflet";
import { Icon } from "leaflet";
import { areArraysEqual } from "../../helpers";
import { Link, useHistory } from "react-router-dom";

const foodbank = new Icon({
  iconUrl: "/foodBank.png",
  iconSize: [25, 25],
});
const communitycentre = new Icon({
  iconUrl: "/communitycentre.png",
  iconSize: [25, 25],
});
const religious = new Icon({
  iconUrl: "/church.png",
  iconSize: [25, 25],
});

const icons = {
  "Food Bank": foodbank,
  "Foodbank": foodbank,
  "Community Centre": communitycentre,
  "Religious Institution": religious,
  "Church": religious,
}

export default function ManageMarkers({ locations, setSingle, zoomInToSingle, state }) {
  let history = useHistory();

  return (
    <>
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.latitude, location.longitude]}
          icon={icons[location.eventType]}
          eventHandlers={{
            click: (e) => {
              if (setSingle) setSingle(location);
              if (zoomInToSingle) zoomInToSingle(location.latitude, location.longitude);
              history.push(`/map/${location.id}`);
            },
          }}
        >
          {/* <Popup>
            <div>
              <h2>{location.name}</h2>
            </div>
          </Popup> */}
        </Marker>
      ))}
    </>
  );
}
