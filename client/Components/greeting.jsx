// Login & signup buttons
// One background image
// <div> containing intro/about us text

// login form
import React, { Component, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

//Import Material-UI components
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

import {
  Button,
  Typography,
} from "@material-ui/core";

//Customize component styles
const useStyles = makeStyles({
  backgroundImage: {
    backgroundImage: `url(${'https://images.pexels.com/photos/3183198/pexels-photo-3183198.jpeg'})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: "center center",
    backgroundAttachment: "fixed",
    width: '100vw',
    minHeight: '100vh',
  },
  title: {
    display: "grid",
    placeItems: "center",
    paddingTop: "10%",
    color: "#E63946",
  },
  subtitle: {
    fontFamily: 'PT Serif',
    fontSize: '36px',
    color: '#457B9D',
    display: "grid",
    placeItems: "center",
  },
  buttonContainer: {
    display: "flex",
    marginTop: "1.25%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    fontFamily: 'Oswald',
    fontSize: '18px',
    justify: "center",
    color: '#F1FAEE',
    background: "linear-gradient(45deg, #1D3557 20%, #457B9D 90%)",
    border: 0,
    borderRadius: 3,
    margin: '10px',
    boxShadow: "0 3px 5px 2px #a8dadc",
    height: 48,
    textAlign: "center",
  },
});

const theme = createMuiTheme({
  typography: {
    fontSize: 75,
    fontFamily: ["Oswald"].join(","),
  },
});

export default function LoginForm() {
  const history = useHistory();

  const classes = useStyles();

  // React hooks
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [count, setCount] = useState(0);
  const [checked, setChecked] = useState(false);
  const [isUser, setUser] = useState(true);
  const [createUsername, setCreateUsername] = useState("");
  const [createPassword, setCreatePassword] = useState("");

  function loginClickHandler(e) {
    //paramaterize the user type: user vs host
    
    //user: fetchstring = /mongo/userlogin
    //host: fetchstring = /mongo/hostlogin
    // change isUser to usertype
    // `"/mongo/"+${usertype}+"userlogin"`

    //fetch(fetchstring)

    //history.push (usertype)

    // handle authentication here
    // console.log(`Username is ${username} and Password is ${password}`);
    
    const userInfo = { username, password };
    e.preventDefault();
    // REFACTOR (change Mongo routes to SQL/consolidate duplicate code (DRY))
    if (isUser) {
      fetch("/mongo/userlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response) history.push("/user");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      fetch("/mongo/hostlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      })
        .then((response) => response.json())

        .then((response) => {
          
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  const handleClick = function () {
    const userInfo = { username: createUsername, password: createPassword };
    console.log(userInfo);
    if (isUser) {
      fetch("/mongo/usersignup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response) history.push("/user");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      fetch("/mongo/hostsignup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response) history.push("/host");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <section className={classes.backgroundImage}>
      <ThemeProvider theme={theme}>
        <div className={classes.title}>
          <Typography>NEXT/ROOM</Typography>
        </div>
      </ThemeProvider>
      <div className={classes.subtitle}>
        A place to look for new spaces to work.
      </div>
      <div 
        className={classes.buttonContainer}
      >

        <Button
          type='submit'
          className={classes.button}
          onClick={() => history.push('/login')}
        > SIGN UP
        </Button>
        <Button
          type='submit'
          className={classes.button}
          onClick={() => history.push('/login')}
        > LOG IN
        </Button>
      </div>
    </section>
  );
}