import React,{useState} from 'react'
import LoginForm from './Components/loginForm.jsx'
import { Route, BrowserRouter as Router } from 'react-router-dom';
import HostPage from './Pages/HostPage.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import UserPage from './Pages/UserPage.jsx';
import UserMap from './Pages/TestMap.jsx';


const App = () => (
  <Router>
    <Route path="/" exact component={LoginPage}/>
    <Route path="/user" component={UserPage}/>
    <Route path="/host" component={HostPage}/>
    <Route path="/secretMap" component={UserMap}/>
  </Router>
)

export default App;