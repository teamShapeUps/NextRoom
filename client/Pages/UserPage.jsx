import React from 'react';
import MenuDrawer from '../Components/menuDrawer.jsx';
import UserMap from '../Components/Map.jsx';
import styles from '../style.css';

export default function UserPage(){
    return(
        <div className='userPageBackground'>
            <MenuDrawer />
            <h1 className='userPageHead' style={{textAlign:'center'}}>ROOMS CURRENTLY AVAILABLE NEAR YOU:</h1>
            <UserMap />
        </div>
    )
}