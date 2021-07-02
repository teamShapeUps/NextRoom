import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { MapContainer, TileLayer, Popup } from 'react-leaflet';
import UserMarker from './userMarker.jsx';
import ToiletMarker from './toiletMarker.jsx';
// import testToiletCard from './toiletCard.jsx';

// toilet dependency injection goes here:

import testToiletSet from './testToiletSet.js';

const L = window.L;

const useStyles = makeStyles({
  map: {
    margin: 'auto',
    padding: '10px',
    height: '500px',
    width: '500px',
  },
  popup: {
    margin: 'auto',
    height: '100px',
    width: '100px',
  }
});

export default function Map() {

  const classes = useStyles();

  // default coordinates
  const coords = [40.785091, -73.968285];

  const bathrooms = testToiletSet;

  const bathroomComponents = [];

  useEffect(() => {
    for (const bathroom of bathrooms) {
      bathroomComponents.push(<ToiletMarker bathroom={bathroom} key={bathroom.bathroomId} />)
    }
  }, bathrooms);

  const mapDrag = function () {
    const map = useMapEvents({
      dragend: (e) => console.log(`Map center latlng is: ${e.target.getCenter()}`)
      })
    }

  const getNewBathrooms = function(latlngArr) {
    // implement API fetch request here
  }

  // const [coords, setCoords] = useState([40.785091, -73.968285]);

  // function UserMarker() {
  //   const map = useMapEvents({
  //     click() {
  //       map.locate()
  //     },
  //     locationfound(e) {
  //       setCoords(e.latlng)
  //       // map.flyTo(e.latlng, map.getZoom())
  //       map.flyTo(e.latlng, map.getZoom())
  //     },
  //   })
  
  //   return coords === null ? null : (
  //     <Marker position={coords}>
  //       <Popup>You are here</Popup>
  //     </Marker>
  //   )
  // };
  
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     console.log("Latitude is :", position.coords.latitude);
  //     console.log("Longitude is :", position.coords.longitude);
  //     setCoords([position.coords.latitude, position.coords.longitude])
  //   })
  // }, coords);

return (
<MapContainer className={classes.map} center={coords} zoom={15} scrollWheelZoom={true}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <UserMarker position={coords} />
  {bathroomComponents}
  {/* <ToiletMarker position={coords} /> */}
</MapContainer>
)}