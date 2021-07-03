import React, { useState, useEffect } from "react";
import { Marker, Popup, useMap } from 'react-leaflet';
//for testing only
import ToiletCard from './toiletCard.jsx';

export default function UserMarker(props) {

  // const [coords, setCoords] = useState([40.785091, -73.968285]);
  const [coords, setCoords] = useState(props.position === null ? [40.785091, -73.968285] : props.position);
  
  const map = useMap();
  
  // const map = useMapEvents({
  //   // click() {
  //   load() {
  //     map.locate()
  //   },
  //   locationfound(e) {
  //     setCoords(e.latlng)
  //     // map.flyTo(e.latlng, map.getZoom())
  //     map.panTo(e.latlng, map.getZoom())
  //   },
  // })

  useEffect(() => {
    map.locate().on('locationfound', function(e) {
      setCoords(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    })
  }, []);

  return (
    <Marker position={coords}>
      {/* <Popup><ToiletCard /></Popup> */}
    </Marker>
  )
};