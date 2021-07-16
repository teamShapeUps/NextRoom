// REFACTOR INTO 'ADDCOMMODE' COMPONENT?
import React, { useEffect, useState } from "react";
import MenuDrawer from "../Components/menuDrawer";
import {
  makeStyles,
  Button,
  Collapse,
  TextField,
  Typography,
} from "@material-ui/core";
import HostToiletCard from "../Components/HostToiletCard";
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
  addButton: {
    fontFamily: "Oswald",
    fontSize: "18px",
    justify: "center",
    color: "#F1FAEE",
    background: "linear-gradient(45deg, #1D3557 20%, #457B9D 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px #457B9D",
    height: 48,
    textAlign: "center",
    marginTop: 25,
  },
  cancelButton: {
    fontFamily: "Oswald",
    fontSize: "18px",
    justify: "center",
    color: "#E63946",
  },
  newRoomForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    height: "600px",
    width: "400px",
  },
  roomsTitle: {
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

export default function RoomsPage() {
  const classes = useStyles();

  const [roomArray, setRoomArray] = useState([]);
  const [dataFromFetch, setDataFromFetch] = useState([]);

  const [addingNewRoom, setAddingNewRoom] = useState(false);

  const [newRoomTitle, setNewRoomTitle] = useState("");
  const [newRoomDescription, setNewRoomDescription] = useState("");
  const [newRoomPrice, setNewRoomPrice] = useState("");
  const [newRoomAddress, setNewRoomAddress] = useState("");
  const [newRoomZip, setNewRoomZip] = useState("");
  const [newRoomImg, setNewRoomImg] = useState("");

  const arrayOfComponents = [];

  //this is the hook solution to lifecycle methods. This is will invoke when the HostPage component mounts
  useEffect(() => {
    console.log("You mounted!");
    //fetch all rooms
    //cookie should be sent with request...right?
    fetchRooms();
  }, []);

  useEffect(() => {
    //handle new bathrooms added to array in this rerender
    //create component for each bathroom to be rendered
    dataFromFetch.forEach((room) => {
      arrayOfComponents.push(
        <HostToiletCard
          handleDeleteRoom={handleDeleteRoom}
          handleUpdateRoom={handleUpdateRoom}
          key={room._id}
          {...room}
        />
      );
    });

    setRoomArray([arrayOfComponents]);
  }, [dataFromFetch]);

  // useEffect( (() => null), [bathroomArray])
  const fetchRooms = function () {
    fetch("/mongo/getBathrooms")
      .then((response) => response.json())
      .then((response) => setDataFromFetch(response));
  };

  const handleDeleteRoom = function (roomId) {
    //delete room using mongo ID. Accessible like this:
    const { _id } = roomId;
    const deleteId = { _id };

    fetch("/mongo/deleteBathroom", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deleteId),
    })
      .then((response) => response.json())
      .then((response) => fetchRooms())
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleUpdateRoom = function (roomProps) {
    //delete room using mongo ID. Accessible like this:
    const {
      _id,
      title: updatedRoomTitle,
      description: updatedRoomDescription,
      address: updatedRoomAddress,
      price: updatedRoomPrice,
      imageFileName: updatedRoomImg,
    } = roomProps;
    const update = {
      _id,
      title: updatedRoomTitle,
      description: updatedRoomDescription,
      address: updatedRoomAddress,
      price: updatedRoomPrice,
      imageFileName: updatedRoomImg,
    };

    fetch("/mongo/updatebathroom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Update Success:", data);
      })
      .then((data) => fetchRooms())
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const addRoomHandler = function () {
    const newRoom = {
      title: newRoomTitle,
      description: newRoomDescription,
      address: newRoomAddress,
      zipcode: newRoomZip,
      imageFileName: newRoomImg,
      price: newRoomPrice,
    };

    fetch("/mongo/addbathroom", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRoom),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const newData = [...dataFromFetch];
        newData.unshift(data);
        setDataFromFetch(newData);
      })
      .catch((error) => {
        console.log("something broke here");

        console.error("Error:", error);
      });

    setNewRoomTitle("");
    setNewRoomDescription("");
    setNewRoomPrice("");
    setNewRoomZip("");
    setNewRoomAddress("");
    setNewRoomImg("");

    setAddingNewRoom(!addingNewRoom);
  };

  return (
    <div className={classes.container}>
      <MenuDrawer />
      <Collapse in={!addingNewRoom}>
        <Button
          className={classes.addButton}
          onClick={() => setAddingNewRoom(!addingNewRoom)}
        >
          Add a Room +
        </Button>
      </Collapse>
      <Collapse in={addingNewRoom}>
        <div className={classes.newRoomForm}>
          <TextField
            label="Title"
            onChange={(e) => setNewRoomTitle(e.target.value)}
          />
          <TextField
            label="Description"
            multiline
            onChange={(e) => setNewRoomDescription(e.target.value)}
          />
          <TextField
            label="Price Per Hour"
            onChange={(e) => setNewRoomPrice(e.target.value)}
          />
          <TextField
            label="Room's Street Address, City, and State"
            onChange={(e) => setNewRoomAddress(e.target.value)}
          />
          <TextField
            label="Room's Zip Code"
            onChange={(e) => setNewRoomZip(e.target.value)}
          />
          <TextField
            label="Image URL"
            onChange={(e) => setNewRoomImg(e.target.value)}
          />
          <Button className={classes.addButton} onClick={addRoomHandler}>
            Submit
          </Button>
          <Button
            className={classes.cancelButton}
            onClick={() => {
              setAddingNewRoom(!addingNewRoom);
            }}
          >
            Cancel
          </Button>
        </div>
      </Collapse>
      <h2 className={classes.roomsTitle}>Your Rooms</h2>

      <div className={classes.cardContainer}>
        {roomArray ? roomArray : "Rooms you're listing or renting will appear here!"}
      </div>
    </div>
  );
}
