import React, { useState, useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import RoomCard from './roomCard.jsx';

const L = window.L;

const iconRoom = new L.Icon({
  iconUrl: require('./roomIcon.svg'),
  iconRetinaUrl: require('./roomIcon.svg'),
  iconAnchor: [21.912265, 64], // was null
  popupAnchor: [0, -64], // was null
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [43.82453, 64.3] // used to be new L.Point(60, 75)
  // className: 'leaflet-div-icon'
});

export default function RoomMarker(props) {

  // const coords = props.position;
  // const card = props.card
  const coords = props.room.roomCoords;

  return (
    <Marker icon={iconRoom} position={coords}>
      <Popup>
        <RoomCard room={props.room} />
      </Popup>
    </Marker>
  )
};