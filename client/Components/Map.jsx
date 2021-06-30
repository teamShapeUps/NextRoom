import { makeStyles } from "@material-ui/core";
import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { MapContainer, TileLayer, Popup } from 'react-leaflet';
import UserMarker from './userMarker.jsx';
import ToiletMarker from './toiletMarker.jsx';
// import ToiletCard from './toiletCard.jsx';

// toilet dependency injection goes here:

const toiletTestSet = [
  [,],
];

const useStyles = makeStyles({
  map: {
    margin: 'auto',
    padding: '10px',
    height: '400px',
    width: '400px',
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
<MapContainer className={classes.map} center={coords} zoom={13} scrollWheelZoom={true}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  {/* <UserMarker position={coords} /> */}
  <ToiletMarker position={coords} />
</MapContainer>
)}