import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import UserMarker from './userMarker.jsx';
import ToiletMarker from './toiletMarker.jsx';
// import testToiletCard from './toiletCard.jsx';

// toilet dependency injection goes here:

import testToiletSet from './testToiletSet.js';

const pp = function(stuff) {
  return JSON.stringify(stuff,null,2)
}

// const L = window.L;

const useStyles = makeStyles({
  map: {
    margin: 'auto',
    padding: '10px',
    height: '800px',
    width: '800px',
  },
  popup: {
    margin: 'auto',
    height: '100px',
    width: '100px',
  }
});

export default function UserMap() {

  const classes = useStyles();

  // default coordinates
  const coords = [40.785091, -73.968285];

  // const bathrooms = testToiletSet;

  // let bathrooms;

  const [toilets, setToilets] = useState([]);

  // useEffect(() => {
  //   console.log(`triggered useEffect`);
  //   bathroomComponents = [];
  //   if (bathrooms) {
  //     console.log(`Creating toiletMarker components`)
  //   for (const bathroom of bathrooms) {
  //     bathroomComponents.push(<ToiletMarker bathroom={bathroom} key={bathroom.bathroomId} />)
  //   }
  // }}, bathrooms);

  const MapDrag = function () {
    const map = useMapEvents({
      load: (e) => {
        map.locate();
        getNewBathrooms(e.target.getCenter())
      },
      moveend: (e) => {
      //console.log(`Map center latlng is: ${e.target.getCenter()}`)
      getNewBathrooms(e.target.getCenter())
      // console.log(`toilets is: ${pp(toilets)}`)
      },
    })
      return null;
    }

  const getNewBathrooms = function(latlngObj, miles=1) {
    const {lat, lng} = latlngObj;
    // console.log(`getNewBathrooms parameter latlngArr is ${JSON.stringify(latlngObj)}`)
    // console.log(`lat: ${lat}, lng: ${lng}`)
    fetch('/mongo/getnearbathrooms', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        latitude: lat,
        longitude: lng,
        miles: miles,
      })
    })
    .then(response => response.json())
    .then(response => {
      const newBathrooms = [];
      response.forEach(elem => {
        const bathroomId = elem._id;
        const [lat, lng] = [elem.location.coordinates[1], elem.location.coordinates[0]];
        const bathroomCoords = [lat, lng];
        const imageUrl = elem.imageFileName;
        const imageTitle = null;
        const descriptionTitle = elem.title;
        const descriptionBody = elem.body;
        const toiletAddress = elem.location.formattedAddress;
        // const toiletAddress2 = elem.
        newBathrooms.push({
          bathroomId,
          bathroomCoords,
          imageUrl,
          imageTitle,
          descriptionTitle,
          descriptionBody,
          toiletAddress,
          // toiletAddress2,
        }) 
      });
      // console.log(`newBathrooms are ${JSON.stringify(newBathrooms, null, 2)}, prototype of newBathrooms ${newBathrooms.prototype}`)
      setToilets(() => [...newBathrooms]);
      // console.log(`toilets are: ${pp(toilets)}`)
    //   console.log(`newBathrooms: ${JSON.stringify(newBathrooms,null,2)}`)
    //   setToiletMarkers((prevState) => {
    //   console.log(`about to create a bunch of toiletMarkers`)
    //   const tempMarkers = new Set();
    //   for (const bathroom of newBathrooms) {
    //     const newComp = (<ToiletMarker bathroom={bathroom} key={bathroom.bathroomId} />);
    //     tempMarkers.add(newComp)
    //     console.log(`Added newComp to tempMarkers set. newComp is ${pp(newComp)} Now tempMarkers is ${pp(tempMarkers)}`)
    // } 
    // console.log(`tempMarkers are ${pp(tempMarkers)} and toiletMarkers are ${pp(Object.keys(toiletMarkers))}`)
    // return (prevState.add(tempMarkers))
    })
    .catch(err => console.log(err))
  }

return (
<MapContainer className={classes.map} center={coords} zoom={15} scrollWheelZoom={true}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <UserMarker position={coords} />
  <MapDrag />
  {/* {toiletMarkers} */}
  {toilets.map(elem => <ToiletMarker bathroom={elem} key={elem.bathroomId} />)}

</MapContainer>
)}