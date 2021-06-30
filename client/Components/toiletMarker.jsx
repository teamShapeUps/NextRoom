import React, { useState, useEffect } from "react";
import { Marker, Popup, useMap } from 'react-leaflet';

const L = window.L;

const iconToilet = new L.Icon({
  iconUrl: require('./toiletIcon.svg'),
  iconRetinaUrl: require('./toiletIcon.svg'),
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: 43, // used to be new L.Point(60, 75)
  // className: 'leaflet-div-icon'
});

export default function ToiletMarker(props) {

  const coords = props.position;
  const card = props.card

  return (
    <Marker icon={iconToilet} position={coords}>
      <Popup>You are here</Popup>
    </Marker>
  )
};