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
        backgroundColor: 'green',
        color: 'white',
        padding: '10px 20px 10px 20px'

    }
})

const cookie = document.cookie;

export default function HostPage(){
    const classes = useStyles();

    const [bathroomArray, setBathroomArray] = useState([]);
    const [dataFromFetch, setDataFromFetch] = useState([]);

    const [newBathTitle, setNewBathTitle] = useState('');
    const [newBathDescription, setNewBathDescription] = useState('');
    const [newBathPrice, setNewBathPrice] = useState('');
    const [newBathAddress, setNewBathAddress] = useState('');
    const [newBathZip, setNewBathZip] = useState('');

    const [updatedBathTitle, setUpdatedBathTitle] = useState('');
    const [updatedBathDescription, setUpdatedBathDescription] = useState('');
    const [updatedBathPrice, setUpdatedBathPrice] = useState('');
    const [updatedBathAddress, setUpdatedBathAddress] = useState('');
    const [updatedBathZip, setUpdatedBathZip] = useState('');

    const bathroomsToDisplay = [];
    const arrayOfComponents = [];

    //this is the hook solution to lifecycle methods. This is will invoke when the HostPage component mounts
    useEffect(() => {
        console.log('You mounted!')
        //fetch all bathrooms
        //cookie should be sent with request...right? 
        fetch('/mongo/getBathrooms')
            .then(response => response.json())
            .then(response => setDataFromFetch(response))
            
        }, [])


    useEffect(() => {
        //handle new bathrooms added to array in this rerender
            //create component for each bathroom to be rendered
        dataFromFetch.forEach(bathroom => arrayOfComponents.push(<HostToiletCard key={bathroom._id} {...bathroom} />))

        setBathroomArray([arrayOfComponents])

    }, [dataFromFetch])


    const addBathroomHandler = function(){
        //uncolapse form? 
        //Add information about bathroom
        //click button to add
            //send to backend and create DB entry
            //return new entry and push new entry into array to display on page
        
    }

    return(
        <div className={classes.container}>
            <MenuDrawer />
            <Button className={classes.addButton} onClick ={addBathroomHandler}>Add a Commode +</Button>
            <h2>Your Bathrooms</h2>
            <div className={classes.cardContainer}>
            {/* <HostToiletCard 
                title={state.title}
                description = {state.description}/> */}
            {bathroomArray? bathroomArray: 'Add a Bathroom to get things moving!'}
            </div>
        </div>
    )
}