<<<<<<< HEAD
import React, { useState } from 'react';
import LoginForm from './Components/loginForm.jsx';

const App = () => (
  <div>
    <h1>Hello React</h1>
    <LoginForm />
  </div>
);
=======
import React,{useState} from 'react'
import LoginForm from './Components/loginForm.jsx'
import { Route, BrowserRouter as Router } from 'react-router-dom';
import HostPage from './Pages/HostPage.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import UserPage from './Pages/UserPage.jsx';


const App = () => (
  <Router>
    <Route path="/" exact component={LoginPage}/>
    <Route path="/user" component={UserPage}/>
    <Route path="/host" component={HostPage}/>
  </Router>
)
>>>>>>> 34ffb13c0f2cd0c59519ac7cd02acb95470d642a

export default App;
