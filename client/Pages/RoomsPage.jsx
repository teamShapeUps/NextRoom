import React, { useEffect, useState, useRef } from "react";
import MenuDrawer from "../Components/menuDrawer";
import {
  makeStyles,
  Button,
  Collapse,
  TextField,
  Typography,
} from "@material-ui/core";
import HostRoomCard from "../Components/HostRoomCard";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
const axios = require("axios");

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#F1FAEE",
    width: "100vw",
    minHeight: "100vh",
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
    color: "#1D3557",
    textShadow: "1px 1px 2px #457B9D",
    fontSize: "60px",
    fontFamily: "Oswald",
    marginTop: "0px",
    marginBottom: "6px",
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
  const [newKey, setNewKey] = useState("");
  const [file, setFile] = useState();
  //const [imageId, setImageId] = useState('');
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const [counter, setcounter] = useState(dataFromFetch.length);

  const arrayOfComponents = [];

  async function postImage({ image, description }) {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);

    const result = await axios.post("/images/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const tempResult = result.data;
    setNewRoomImg(tempResult.imagePath.slice(8));
    //setImageId(tempResult.imagePath)
    return result.data;
  }

  async function submit(event) {
    const result = await postImage({ image: file, description });
    setImages([result.image, ...images]);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    submit(event);
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const prevcounter = useRef(0);

  //this is the hook solution to lifecycle methods. This is will invoke when the HostPage component mounts
  useEffect(() => {
    //console.log('You mounted!');
    //fetch all rooms
    //cookie should be sent with request...right?
    fetch("/users/check") // <-- NICE this fixed the id issue?
      .then((data) => data.json())
      .then((data) => setNewKey(data.id))
      .then(() => fetchRooms());
  }, []);

  useEffect(() => {
    //handle new rooms added to array in this rerender
    //create component for each room to be rendered

    dataFromFetch.forEach((room) => {
      arrayOfComponents.push(
        <HostRoomCard
          handleDeleteRoom={handleDeleteRoom}
          handleUpdateRoom={handleUpdateRoom}
          key={newKey}
          {...room}
        />
      );
    });

    setRoomArray([arrayOfComponents]);
    //console.log(prevcounter.current, counter)
    if (prevcounter.current < counter) {
      window.location = "/rooms";
    }
  }, [dataFromFetch]);

  // useEffect( (() => null), [roomArray])
  const fetchRooms = function () {
    axios
      .get("/rooms/getroom")
      .then((res) => res.data)
      .then((data) => setDataFromFetch(data));
  };

  const handleDeleteRoom = function (roomId) {
    //delete room using mongo ID. Accessible like this:
    const id = res.locals.token.id;
    const deleteId = id;

    fetch("/rooms/deleteroom", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
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
      id,
      title: updatedRoomTitle,
      description: updatedRoomDescription,
      address: updatedRoomAddress,
      price: updatedRoomPrice,
      imageFileName: updatedRoomImg,
    } = roomProps;
    const update = {
      id,
      title: updatedRoomTitle,
      description: updatedRoomDescription,
      address: updatedRoomAddress,
      price: updatedRoomPrice,
      imageFileName: updatedRoomImg,
    };

    fetch("/rooms/updateroom", {
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
  const addRoomHandler = async () => {
    const newRoom = {
      title: newRoomTitle,
      description: newRoomDescription,
      address: newRoomAddress,
      zipcode: newRoomZip,
      imageFileName: newRoomImg,
      price: newRoomPrice,
    };
    try {
      fetch("/rooms/addroom", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRoom),
      })
        //.then((response) => response.json())
        .then((data) => {
          //console.log(data);
          const newData = [...dataFromFetch];
          setcounter(newData.length + 1);
          setDataFromFetch(newData);
        })
        .catch((error) => {
          console.log("something broke here");
          console.log("Error:", error);
        });

      setNewRoomTitle("");
      setNewRoomDescription("");
      setNewRoomPrice("");
      setNewRoomZip("");
      setNewRoomAddress("");
      setNewRoomImg("");

      await setAddingNewRoom(!addingNewRoom);
      //setTimeout(refreshRoomPage(), 1000)
    } catch (err) {
      console.log(err);
    }
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
          {/* <TextField
            label="Image URL"
            onChange={(e) => setNewRoomImg(e.target.value)}
          /> */}
          <div className="uploadForm">
            <form onSubmit={handleSubmit}>
              <input
                onChange={fileSelected}
                type="file"
                accept="image/*"
              ></input>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
              ></input>
              <button type="submit">Upload</button>
            </form>

            {images.map((image) => (
              <div key={image}>
                <img src={image}></img>
              </div>
            ))}
          </div>
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
        {roomArray
          ? roomArray
          : "Rooms you're listing or renting will appear here!"}
      </div>
    </div>
  );
}
