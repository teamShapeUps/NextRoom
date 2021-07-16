import React from 'react';
import MenuDrawer from '../Components/menuDrawer.jsx';
import UserMap from '../Components/Map.jsx';
import styles from '../style.css';

export default function MapPage(){
    return(
        <div className='mapPageBackground'>
            <MenuDrawer />
            <h1 className='mapPageHead' style={{textAlign:'center'}}>ROOMS CURRENTLY AVAILABLE NEAR YOU:</h1>
            <UserMap />
        </div>
    )
}