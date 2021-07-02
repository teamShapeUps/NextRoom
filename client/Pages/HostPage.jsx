import React, { useEffect, useState } from 'react';
import MenuDrawer from '../Components/menuDrawer';
import { makeStyles, Button } from '@material-ui/core';
import HostToiletCard from '../Components/HostToiletCard';

const useStyles = makeStyles({
    container:{
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
    },
    addButton:{
        display: 'flex',
        justifySelf: 'flex-end'
    }
})


export default function HostPage(){
    const classes = useStyles();

    const [bathroomArray, setBathroomArray] = useState([]);

   

    //this is the hook solution to lifecycle methods. This is will invoke when the HostPage component mounts
    useEffect(() => {
        console.log('You mounted!')
        //fetch all bathrooms
        //cookie should be sent with request...right? 
        fetch('')
        
    }, [])

    const bathroomsDisplayed = [];

    useEffect(() => {
        //handle new bathrooms added to array in this rerender
            //create component for each bathroom to be rendered
        bathroomArray.forEach(bathroom => bathroomsDisplayed.push(bathroom));
    }, bathroomArray)


    const addBathroomHandler = function(){
        //uncolapse form? 
        //Add information about bathroom
        //click button to add
            //send to backend and create DB entry
            //return new entry and push new entry into array to display on page
        console.log('Logic for adding bathroom');
    }
    const state = {
        title: "Bathroom title here",
        description: 'Some words about what a great bathroom this is'
    }
    return(
        <div>
            <MenuDrawer />
            <Button className={classes.addButton} onClick ={addBathroomHandler}>Add a Commode +</Button>
            <h1>You're a Host!</h1>
            <div className={classes.container}>
            <HostToiletCard 
                title={state.title}
                description = {state.description}/>
            {bathroomsDisplayed}
            </div>
        </div>
    )
}