import "./App.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import React from "react";
import * as eventData from "./event.json";

export default function Mapp() {
  const eventIcon = new Icon({
    iconUrl: "./foodBank.png",
    iconSize: [25, 25],
  });

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {eventData.eventProperties.map((event) => (
        <Marker
          key={event.eventId}
          position={[event.coordinates[0], event.coordinates[1]]}
          icon={eventIcon}
        >
          <Popup>
            <div>
              <h2>{event.discription}</h2>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
