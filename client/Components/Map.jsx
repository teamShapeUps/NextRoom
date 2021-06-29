import { makeStyles } from "@material-ui/core";
import React, {useEffect, useState} from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import ToiletCard from './toiletCard.jsx';

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

  const [coords, setCoords] = useState([40.785091, -73.968285]);
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setCoords([position.coords.latitude, position.coords.longitude])
    })
  }, coords);

return (
<MapContainer className={classes.map} center={coords} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={coords}>
    <Popup>
      {/* A pretty CSS3 popup. <br /> Easily customizable. */}
      <ToiletCard />
    </Popup>
  </Marker>
</MapContainer>
)}