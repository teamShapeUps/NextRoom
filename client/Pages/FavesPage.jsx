// REFACTOR INTO 'ADDROOM' COMPONENT?
import React, { useEffect, useState } from "react";
import MenuDrawer from "../Components/menuDrawer";
import {
  makeStyles,
} from "@material-ui/core";
import HostRoomCard from "../Components/HostRoomCard";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#F1FAEE",
    width: '100vw',
    minHeight: '100vh',
  },
  favesTitle: {
    color: '#1D3557',
    textShadow: '1px 1px 2px #457B9D',
    fontSize: '60px',
    fontFamily: 'Oswald',
    marginTop: '0px',
    marginBottom: '6px',
  },
});

const theme = createTheme({
  typography: {
    fontFamily: ["Permanent Marker", "cursive"].join(","),
  },
});

export default function FavesPage() {
  const classes = useStyles();

  // const [favesArray, setFavesArray] = useState([]);
  // const [dataFromFetch, setDataFromFetch] = useState([]);

  // const arrayOfComponents = [];

  // //this is the hook solution to lifecycle methods. This is will invoke when the HostPage component mounts
  // useEffect(() => {
  //   console.log("You mounted!");
  //   //fetch all rooms
  //   //cookie should be sent with request...right?
  //   fetchFaves();
  // }, []);

  // useEffect(() => {
  //   //handle new rooms added to array in this rerender
  //   //create component for each room to be rendered
  //   dataFromFetch.forEach((fave) => {
  //     arrayOfComponents.push(
  //       <HostRoomCard
  //         handleDeleteFave={handleDeleteFave}
  //         key={fave._id}
  //         {...fave}
  //       />
  //     );
  //   });

  //   setFavesArray([arrayOfComponents]);
  // }, [dataFromFetch]);

  // // useEffect( (() => null), [roomArray])
  // const fetchRooms = function () {
  //   fetch("/mongo/getBathrooms")
  //     .then((response) => response.json())
  //     .then((response) => setDataFromFetch(response));
  // };

  // const handleDeleteFave = function (faveId) {
  //   //delete room using mongo ID. Accessible like this:
  //   const { _id } = faveId;
  //   const deleteId = { _id };

  //   fetch("/mongo/deleteBathroom", {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(deleteId),
  //   })
  //     .then((response) => response.json())
  //     .then((response) => fetchFaves())
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  return (
    <div className={classes.container}>
      <MenuDrawer />
      <h2 className={classes.favesTitle}>Your Faves</h2>

      <div className={classes.cardContainer}>
        {/* {favesArray ? favesArray : "Rooms you're listing or renting will appear here!"} */}
      </div>
    </div>
  );
}
