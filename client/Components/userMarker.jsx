import { useState } from "react";
import { Marker, Popup, useMapEvents } from 'react-leaflet';

export default function UserMarker() {

  const [coords, setCoords] = useState([40.785091, -73.968285]);
  const map = useMapEvents({
    // click() {
    load() {
      map.locate()
    },
    locationfound(e) {
      setCoords(e.latlng)
      // map.flyTo(e.latlng, map.getZoom())
      map.panTo(e.latlng, map.getZoom())
    },
  })

  return (
    <Marker position={coords}>
      <Popup>You are here</Popup>
    </Marker>
  )
};