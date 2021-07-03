import React from 'react';
import MenuDrawer from '../Components/menuDrawer.jsx';
import UserMap from '../Components/Map.jsx';

export default function UserPage(){
    return(
        <div>
            <MenuDrawer />
            <h1 style={{textAlign:'center'}}>Bathrooms for Rent In Your Area</h1>
            <UserMap />
        </div>
    )
}