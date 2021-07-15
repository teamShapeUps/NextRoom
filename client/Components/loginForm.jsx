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
    fontFamily: ["Eurostile", "cursive"].join(","),
  },
  button: {
    // display:'flex',
    // flexDirection: 'row',
    justify: "center",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    textAlign: "center",
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
    cursor: "pointer",
    textDecoration: "underline",
    "&:hover": {
      color: "#FE6B8B",
    },
  },
  div: {
    display: "flex",
    marginTop: "5%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#B6D0E2",
    margin: "0 40% 0 40%",
    borderRadius: "5%",
    boxShadow: "0 3px 5px 2px #FE6B8B",
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
    <section>
      <ThemeProvider theme={theme}>
        <div className={classes.title}>
          {/* <Typography>Potty Over Here</Typography> */}
          <Typography>NEXT/ROOM</Typography>
        </div>
      </ThemeProvider>
      <div className={classes.div}>
        <h1>{checked ? "Sign Up" : "Login"}</h1>
        <Switch onChange={() => setUser(!isUser)} className={classes.toggle} />
        <p>{isUser ? "User Login" : "Host Login"}</p>
        <Box className={classes.box}>
          <Collapse in={!checked} orientation="horizontal">
            <TextField
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <br />
            <TextField
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            <Button
              type="submit"
              className={classes.button}
              disabled={!validateSignIn()}
              onClick={loginClickHandler}
            >
              {isUser ? "Click to Login as User!" : "Login as Host!"}
            </Button>
          </Collapse>

          <br />

          <a className={classes.signup} onClick={() => setChecked(!checked)}>
            {checked ? "Back to Login" : "Sign up!?"}
          </a>
          <Collapse in={checked} orientation="horizontal">
            <br />
            <br />
            <TextField
              placeholder="username"
              onChange={(e) => setCreateUsername(e.target.value)}
            />
            <br />
            <br />
            <TextField
              placeholder="password"
              onChange={(e) => setCreatePassword(e.target.value)}
            />
            <br />
            <br />
            <Button
              className={classes.button}
              disabled={!validateSignUp()}
              onClick={handleCreate}
            >
              Create New
              {isUser ? "User" : "Host"}
            </Button>
          </Collapse>
        </Box>
      </div>
    </section>
  );
}
