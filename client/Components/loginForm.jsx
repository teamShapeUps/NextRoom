// login form
import React, { Component, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

//Import Material-UI components
import {
  makeStyles,
  ThemeProvider,
  createTheme,
} from "@material-ui/core/styles";

import {
  Button,
  Box,
  TextField,
  Collapse,
  Switch,
  Typography,
} from "@material-ui/core";

import axios from "axios";

const useStyles = makeStyles({
  text: {
    fontSize: 15,
    fontFamily: ["Oswald"],
  },
  logo: {
    display: "grid",
    placeItems: "center",
    paddingTop: "4%",
  },
  button: {
    // display:'flex',
    // flexDirection: 'row',
    fontFamily: "Oswald",
    fontSize: "18px",
    justify: "center",
    color: "#F1FAEE",
    background: "linear-gradient(45deg, #1D3557 20%, #457B9D 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px #457B9D",
    height: 48,
    width: 220,
    textAlign: "center",
    marginTop: 25,
  },
  box: {
    display: "grid",
    placeItems: "center",
    paddingBottom: "10%",
    width: "clamp(300px, 300px, 300px)",
  },
  title: {
    display: "grid",
    placeItems: "center",
    paddingTop: "5%",
    color: "#E63946",
  },
  signup: {
    marginTop: "5%",
    cursor: "pointer",
    textDecoration: "underline",
    "&:hover": {
      color: "#E63946",
    },
  },
  element: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  div: {
    fontFamily: "Oswald",
    color: '#1D3557',
    display: "flex",
    marginTop: "2%",
    paddingTop: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#a8dadc",
    margin: "0 40% 0 40%",
    borderRadius: "5%",
    boxShadow: "0 3px 5px 2px #457B9D",
  },
});

const theme = createTheme({
  typography: {
    // fontSize: '300px',
    fontSize: 75,
    fontFamily: ["Oswald"],
  },
});

export default function LoginForm() {
  const history = useHistory();

  const classes = useStyles();

  // React hooks
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [count, setCount] = useState(0);
  const [checked, setChecked] = useState(false);
  const [isUser, setUser] = useState(true);
  const [createUsername, setCreateUsername] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [loggedIn, setLoggedIn] = useState("");

  function loginClickHandler(e) {
    e.preventDefault();
    //logs if post was called on click
    console.log("post called successfully");
    console.log(typeof username);
    if (isUser) {
      // still need to implement user or host logic
      axios
        .post("/users/userlogin", {
          data: {
            username: username,
            password: password,
          },
        })
        .then((res) => {
          if (res.data === "good") {
            setLoggedIn(true);
          }
          console.log(res.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  if (loggedIn) {
    history.push("/user");
  }

  // disables buttons if length of required fields is 0
  const validateSignIn = function () {
    return username.length > 0 && password.length > 0;
  };
  const validateSignUp = function () {
    return createUsername.length > 0 && createPassword.length > 0;
  };

  const handleCreate = function (e) {
    // Obtaines username/pw from state
    const username = createUsername;
    const password = createPassword;
    e.preventDefault();
    console.log("Create user post called");
    if (isUser) {
      axios
        .post("/users/usersignup", {
          data: {
            username: username,
            password: password,
          },
        })
        .then((res) => {
          if (res.data === "good") {
            setLoggedIn(true);
          }
          console.log(res.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <section className='userPageBackground'>
      {/* <ThemeProvider theme={theme}>
        <div className={classes.title}>
          <Typography>NEXT/ROOM</Typography>
        </div>
      </ThemeProvider> */}
      <Box className={classes.logo}>
        <img src='../Assets/NEXTROOM_LOGO_2.0.png' width='240px'></img>
      </Box>
      <div className={classes.div}>
        <h1>{checked ? "SIGN UP" : "LOG IN"}</h1>
        <Box className={classes.box}>
          <Collapse in={!checked} orientation="horizontal">
            <TextField
              className={classes.element}
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              className={classes.element}
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              className={classes.button}
              disabled={!validateSignIn()}
              onClick={loginClickHandler}
            >
              {"Click to Login as User"}
            </Button>
          </Collapse>
          <a className={classes.signup} onClick={() => setChecked(!checked)}>
            {checked ? "Back to Login" : "Sign up"}
          </a>
          <Collapse in={checked} orientation="horizontal">
            <TextField
              className={classes.element}
              placeholder="username"
              onChange={(e) => setCreateUsername(e.target.value)}
            />
            <TextField
              className={classes.element}
              placeholder="password"
              type="password"
              onChange={(e) => setCreatePassword(e.target.value)}
            />
            <Button
              className={classes.button}
              disabled={!validateSignUp()}
              onClick={handleCreate}
            >
              Create New
              {" User"}
            </Button>
          </Collapse>
        </Box>
      </div>
    </section>
  );
}
