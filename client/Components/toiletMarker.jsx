import React, { useState, useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
// import TempToiletCard from './tempToiletCard.jsx';
import ToiletCard from './toiletCard';

const L = window.L;

const iconToilet = new L.Icon({
  iconUrl: require('./toiletIcon.svg'),
  iconRetinaUrl: require('./toiletIcon.svg'),
  iconAnchor: [21.912265, 64], // was null
  popupAnchor: [0, -64], // was null
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [43.82453, 64.3] // used to be new L.Point(60, 75)
  // className: 'leaflet-div-icon'
});

export default function ToiletMarker(props) {

  // const coords = props.position;
  // const card = props.card
  const coords = props.bathroom.bathroomCoords;

  return (
    <Marker icon={iconToilet} position={coords}>
      <Popup>
        <ToiletCard bathroom={props.bathroom} />
      </Popup>
    </Marker>
  )
};