import React, { useEffect, useState } from "react";
import { Marker, useMapEvents } from 'react-leaflet'
import { Icon } from "leaflet";
import 'leaflet/dist/leaflet.css';


const icon = new Icon({
  iconUrl: "/location.jpg",
  iconSize: [30, 30],
});

export default function AddMarker({ info, setInfo, lat, setLat, lng, setLng }) {
  const [position, setPosition] = useState(null)

  const map = useMapEvents({
    click(e) {
      console.log(e.latlng)
      setPosition(e.latlng)
      setLat(e.latlng.lat)
      setLng(e.latlng.lng)
    },
  })
  useEffect(() => {
    if (lat === null || lng === null) {
      return null;
    }
    fetch(`http://open.mapquestapi.com/geocoding/v1/reverse?key=FYBHvxq2QoPUrvEdAgWYj0Z1KMRuSVn0&location=${lat},${lng}`)
      .then(response => response.json())
      .then(detail => setInfo(detail.results[0].locations[0]))
      .catch(console.log);
    console.log(info)
  }, [position])

  return position === null ? null : (
    <Marker position={position} icon={icon}>
    </Marker>
  )
}