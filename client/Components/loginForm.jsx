// login form
import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, TextField } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  field: {
      background: 'black',
  }
});



export default function LoginForm() {
  const classes = useStyles();
  return (
    <>
    <h1>Login:</h1>
    <Box className={classes.field}>
        {/* <Username ></Username> */}
        {/* <Password></Password> */}
        <Button className={classes.root}>Test Button</Button>
    </Box>
    </>
)
};