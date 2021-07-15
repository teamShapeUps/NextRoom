// Module imports
import React, { useState } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import LandingPage from "./Pages/LandingPage.jsx";
import LoginForm from "./Components/loginForm.jsx";
import RoomsPage from "./Pages/RoomsPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import MapPage from "./Pages/MapPage.jsx";
import ImagePage from "./Pages/ImagePage.jsx";

const App = () => (
  <Router>
    <Route path="/" exact component={LandingPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/rooms" component={RoomsPage} />
    <Route path="/map" component={MapPage} />
    <Route path="/images" component={ImagePage} />
  </Router>
);

export default App;
