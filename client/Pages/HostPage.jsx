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
  },
  addButton: {
    backgroundColor: "green",
    color: "white",
    padding: "10px 20px 10px 20px",
  },
  cancelButton: {
    color: "red",
  },
  newBathForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    height: "600px",
    width: "400px",
  },
  hostTitle: {
    color: "#FE6B8B",
    fontSize: 60,
  },
});

const theme = createTheme({
  typography: {
    fontFamily: ["Permanent Marker", "cursive"].join(","),
  },
});

export default function HostPage() {
  const classes = useStyles();

  const [bathroomArray, setBathroomArray] = useState([]);
  const [dataFromFetch, setDataFromFetch] = useState([]);

  const [addingNewBath, setAddingNewBath] = useState(false);

  const [newBathTitle, setNewBathTitle] = useState("");
  const [newBathDescription, setNewBathDescription] = useState("");
  const [newBathPrice, setNewBathPrice] = useState("");
  const [newBathAddress, setNewBathAddress] = useState("");
  const [newBathZip, setNewBathZip] = useState("");
  const [newBathImg, setNewBathImg] = useState("");

  const arrayOfComponents = [];

  //this is the hook solution to lifecycle methods. This is will invoke when the HostPage component mounts
  useEffect(() => {
    console.log("You mounted!");
    //fetch all bathrooms
    //cookie should be sent with request...right?
    fetchBathrooms();
  }, []);

  useEffect(() => {
    //handle new bathrooms added to array in this rerender
    //create component for each bathroom to be rendered
    dataFromFetch.forEach((bathroom) => {
      arrayOfComponents.push(
        <HostToiletCard
          handleDeleteBathroom={handleDeleteBathroom}
          handleUpdateBathroom={handleUpdateBathroom}
          key={bathroom._id}
          {...bathroom}
        />
      );
    });

    setBathroomArray([arrayOfComponents]);
  }, [dataFromFetch]);

  // useEffect( (() => null), [bathroomArray])
  const fetchBathrooms = function () {
    fetch("/mongo/getBathrooms")
      .then((response) => response.json())
      .then((response) => setDataFromFetch(response));
  };

  const handleDeleteBathroom = function (bathroomId) {
    //delete bathroom using mongo ID. Accessible like this:
    const { _id } = bathroomId;
    const deleteId = { _id };

    fetch("/mongo/deleteBathroom", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deleteId),
    })
      .then((response) => response.json())
      .then((response) => fetchBathrooms())
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleUpdateBathroom = function (bathroomProps) {
    //delete bathroom using mongo ID. Accessible like this:
    const {
      _id,
      title: updatedBathTitle,
      description: updatedBathDescription,
      address: updatedBathAddress,
      price: updatedBathPrice,
      imageFileName: updatedBathImg,
    } = bathroomProps;
    const update = {
      _id,
      title: updatedBathTitle,
      description: updatedBathDescription,
      address: updatedBathAddress,
      price: updatedBathPrice,
      imageFileName: updatedBathImg,
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
      .then((data) => fetchBathrooms())
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const addBathroomHandler = function () {
    const newBath = {
      title: newBathTitle,
      description: newBathDescription,
      address: newBathAddress,
      zipcode: newBathZip,
      imageFileName: newBathImg,
      price: newBathPrice,
    };

    fetch("/mongo/addbathroom", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBath),
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

    setNewBathTitle("");
    setNewBathDescription("");
    setNewBathPrice("");
    setNewBathZip("");
    setNewBathAddress("");
    setNewBathImg("");

    setAddingNewBath(!addingNewBath);
  };

  return (
    <div className={classes.container}>
      <MenuDrawer />
      <Collapse in={!addingNewBath}>
        <Button
          className={classes.addButton}
          onClick={() => setAddingNewBath(!addingNewBath)}
        >
          Add a Commode +
        </Button>
      </Collapse>
      <Collapse in={addingNewBath}>
        <div className={classes.newBathForm}>
          <TextField
            label="Title"
            onChange={(e) => setNewBathTitle(e.target.value)}
          />
          <TextField
            label="Description"
            multiline
            onChange={(e) => setNewBathDescription(e.target.value)}
          />
          <TextField
            label="$$$ / 10mins"
            onChange={(e) => setNewBathPrice(e.target.value)}
          />
          <TextField
            label="Bathroom's Street, City, and State"
            onChange={(e) => setNewBathAddress(e.target.value)}
          />
          <TextField
            label="Bathroom's Zip Code"
            onChange={(e) => setNewBathZip(e.target.value)}
          />
          <TextField
            label="Image URL"
            onChange={(e) => setNewBathImg(e.target.value)}
          />
          <Button className={classes.addButton} onClick={addBathroomHandler}>
            Get this Potty Started!
          </Button>
          <Button
            className={classes.cancelButton}
            onClick={() => {
              setAddingNewBath(!addingNewBath);
            }}
          >
            Nah, it's not Potty time yet
          </Button>
        </div>
      </Collapse>
      <h2 className={classes.hostTitle}>Your Bathrooms</h2>

      <div className={classes.cardContainer}>
        {bathroomArray ? bathroomArray : "Add a Bathroom to get things moving!"}
      </div>
    </div>
  );
}
