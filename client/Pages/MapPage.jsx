import React, { useState}from 'react';
import MenuDrawer from '../Components/menuDrawer.jsx';
import UserMap from '../Components/Map.jsx';
import styles from '../style.css';


export default function MapPage(){
    const [allrooms, setallrooms] = useState(0)
    fetch('/rooms/getallrooms', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
          },
    })
    .then(data=>data.json())
    .then(data=>setallrooms(data))

    return(
        <div className='mapPageBackground'>
            <MenuDrawer />
            <h1 className='mapPageHead' style={{textAlign:'center'}}>ROOMS CURRENTLY AVAILABLE NEAR YOU:</h1>
            <UserMap allrooms = {allrooms}/>
        </div>
    )
}