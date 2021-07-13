import React, { useState } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import LoginForm from './Components/loginForm.jsx';
import HostPage from './Pages/HostPage.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import UserPage from './Pages/UserPage.jsx';
import ImagePage from './Pages/ImagePage.jsx'
// import UserMap from './Pages/UserMap.jsx';

const App = () => (
  <Router>
    <Route path="/" exact component={LoginPage}/>
    <Route path="/user" component={UserPage}/>
    <Route path="/host" component={HostPage}/>
    <Route path="/images" component = {ImagePage}/>
    {/* <Route path="/secretMap" component={UserMap}/> */}
  </Router>
);

export default App;
