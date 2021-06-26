import React,{useState} from 'react'
import LoginForm from './Components/loginForm.jsx'
import MenuDrawer from './Components/menuDrawer.jsx';

const App = () => (
    <div>
        {/* <h1>Hello React</h1> */}
        <MenuDrawer />
        <LoginForm />
    </div>
)

export default App;