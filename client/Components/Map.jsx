import { makeStyles, Box } from "@material-ui/core";

import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  LayersControl,
} from "react-leaflet";
import UserMarker from "./userMarker.jsx";
import RoomMarker from "./roomMarker.jsx";
// import testRoomCard from './roomCard.jsx';

// room dependency injection goes here:
import testRoomSet from "./testRoomSet.js";
import location from "./location.json";

// const L = window.L;

const useStyles = makeStyles({
  border: {
    margin: "auto",
    height: "602px",
    width: "802px",
  },
  map: {
    margin: "auto",
    marginBottom: "20px",
    padding: "10px",
    height: "600px",
    width: "800px",
  },
  popup: {
    margin: "auto",
    height: "100px",
    width: "100px",
  },
});

export default function UserMap(props) {
  const classes = useStyles();
  //const [allRooms, setAllRooms] = useState([]);

  // default coordinates
  const coords = [40.785091, -73.968285];
  //console.log(props.allrooms)
  // TEST ROOM SET FUNCTIONALITY
  const rooms = testRoomSet;
  const allrooms = [];

  for (let i = 0; i < location.length; i++) {
    allrooms.push({
      roomId: i,
      roomCoords: [location[i].latitude, location[i].longitude],
      price: location[i].price,
      imageUrl: location[i].imagefilename,
      imageTitle: null,
      descriptionTitle: location[i].title,
      descriptionBody: location[i].description,
      roomAddress: location[i].address,
      roomAddress2: null,
    });
  }

  // let rooms;

  // const [rooms, setRooms] = useState([]); <--- COMMENTED OUT TEMPORARILY

  // useEffect(() => {
  //   console.log(`triggered useEffect`);
  //   roomComponents = [];
  //   if (rooms) {
  //     console.log(`Creating roomMarker components`)
  //   for (const room of rooms) {
  //     roomComponents.push(<RoomMarker room={room} key={room.roomId} />)
  //   }
  // }}, rooms);

  const MapDrag = function () {
    const map = useMapEvents({
      load: (e) => {
        map.locate();
        // getNewRooms(e.target.getCenter());  <--- COMMENTED OUT TEMPORARILY
      },
      moveend: (e) => {
        //console.log(`Map center latlng is: ${e.target.getCenter()}`)
        // getNewRooms(e.target.getCenter());   <--- COMMENTED OUT TEMPORARILY
      },
    });
    return null;
  };

  // COMMENTED OUT TEMPORARILY:
  // const getNewRooms = function (latlngObj, miles = 1) {
  //   const { lat, lng } = latlngObj;
  //   // console.log(`getNewRooms parameter latlngArr is ${JSON.stringify(latlngObj)}`)
  //   // console.log(`lat: ${lat}, lng: ${lng}`)
  //   fetch("/mongo/getnearbathrooms", {
  //     method: "POST",
  //     mode: "cors",
  //     cache: "no-cache",
  //     headers: {
  //       "Content-Type": "application/json",
  //       // 'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     body: JSON.stringify({
  //       latitude: lat,
  //       longitude: lng,
  //       miles: miles,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       const newRooms = [];
  //       response.forEach((elem) => {
  //         const roomId = elem._id;
  //         const [lat, lng] = [
  //           elem.location.coordinates[1],
  //           elem.location.coordinates[0],
  //         ];
  //         const roomCoords = [lat, lng];
  //         const imageUrl = elem.imageFileName;
  //         const imageTitle = null;
  //         const descriptionTitle = elem.title;
  //         const descriptionBody = elem.body;
  //         const roomAddress = elem.location.formattedAddress;
  //         // const roomAddress2 = elem.
  //         newRooms.push({
  //           roomId,
  //           roomCoords,
  //           imageUrl,
  //           imageTitle,
  //           descriptionTitle,
  //           descriptionBody,
  //           roomAddress,
  //           // roomAddress2,
  //         });
  //       });
  //       // console.log(`newRooms are ${JSON.stringify(newRooms, null, 2)}, prototype of newRooms ${newRooms.prototype}`)
  //       setRooms(() => [...newRooms]);
  //       //   console.log(`newRooms: ${JSON.stringify(newRooms,null,2)}`)
  //       //   setRoomMarkers((prevState) => {
  //       //   console.log(`about to create a bunch of roomMarkers`)
  //       //   const tempMarkers = new Set();
  //       //   for (const room of newRooms) {
  //       //     const newComp = (<RoomMarker room={room} key={room.roomId} />);
  //       //     tempMarkers.add(newComp)
  //       //     console.log(`Added newComp to tempMarkers set`)
  //       // }
  //       // return (prevState.add(tempMarkers))
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <Box className={classes.border} border={1} borderColor="#1D3557">
      <MapContainer
        className={classes.map}
        center={coords}
        zoom={15}
        scrollWheelZoom={true}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Light Mode">
            <TileLayer
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Dark Mode">
            <TileLayer
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Vivid Mode">
            <TileLayer
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Grayscale">
            <TileLayer
              attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Watercolor">
            <TileLayer
              attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        <UserMarker position={coords} />
        <MapDrag />
        {/* {roomMarkers} */}
        {/* {rooms.map((elem) => ( */}
        {allrooms.map((elem) => (
          <RoomMarker room={elem} key={elem.roomId} />
        ))}
      </MapContainer>
    </Box>
  );
}
