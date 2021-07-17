import React, { useEffect, useState } from 'react';
import {makeStyles, 
        Card, 
        TextField, 
        CardContent, 
        CardMedia, 
        Button, 
        Typography,
        Collapse} from '@material-ui/core';
import { CollectionsBookmark } from '@material-ui/icons';


const useStyles = makeStyles({
  card: {
    minWidth: 800,
    margin: "25px 0 25px 0",
    boxShadow:'0 3px 5px 2px rgba(255, 105, 135, .3)',

  },
  media: {
    height: 350,
    width: 250
  },
  cardContentContainer:{
    display:'flex',

  },
  booked:{
    display:'flex',
    justifyContent:'flex-end',
    color: "#FE6B8B",
    borderStyle:'solid',
    padding:'0 20px 0 20px',
    width: 'fit-content'
  },
  available:{
    display:'flex',
    justifyContent:'flex-end',
    color: 'green',
    borderStyle:'solid',
    padding:'0 20px 0 20px',
    width: 'fit-content'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end'
  },
  updateForm: {
    padding: "50px 15px 15px 15px",
    display: 'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    alignItems:'center',
    height: 1000
  },
  saveButton:{
    color: 'green',
  },
  cancelButton:{
    color: 'red'
  }

});


export default function HostRoomCard(props){

    const {id, available, title, description, imagefilename, price} = props;
    //pass in props from query
    const classes = useStyles();

    const [toggleEdit, setToggleEdit] = useState(true);

    const [updatedRoomTitle, setUpdatedRoomTitle] = useState(title);
    const [updatedRoomDescription, setUpdatedRoomDescription] = useState(description);
    const [updatedRoomPrice, setUpdatedRoomPrice] = useState(price);
    const [updatedRoomAddress, setUpdatedRoomAddress] = useState(props.address);
    //const [updatedRoomAddress, setUpdatedRoomAddress] = useState(props.location.formattedAddress);
    //const [updatedRoomZip, setUpdatedRoomZip] = useState('');
    const [updatedRoomImg, setUpdatedRoomImg] = useState(imagefilename);

    // const getImageFileName = ()=>{
    //   fetch('/images/getimage')
    //   .then(data=>)
    // }

    useEffect(()=>{
      //console.log(props.imagefilename)
      //console.log(updatedRoomImg)
    })

    const handleDeleteRoom = function(){
        //delete room using mongo ID. Accessible like this:
        console.log(id);
        console.log(title);
        //console.log(props.location.formattedAddress);
        fetch('/rooms/deleteroom', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id, title}),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        })
        window.location = "/rooms";
    }
  
    const handleUpdateRoom = function(){
      //delete room using mongo ID. Accessible like this:
      const update = {id, title: updatedRoomTitle, description: updatedRoomDescription, address:updatedRoomAddress , price: updatedRoomPrice, imagefilename: updatedRoomImg}
      
      fetch('/rooms/updateroom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(update),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Update Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      })

      setToggleEdit(!toggleEdit);
     
  }

  const clickUpdate = function(){
    const update = {id, title: updatedRoomTitle, description: updatedRoomDescription, address:updatedRoomAddress , price: updatedRoomPrice, imagefilename: updatedRoomImg}
    handleUpdateRoom(update);
    setToggleEdit(!toggleEdit);
  }

  const clickDelete = function(){
    const data = {id, title};
    //props.handleDeleteRoom(roomId);
    handleDeleteRoom(data);
  }

    return(
        // <TextField defaultValue={props.text}/>
        <Card className={classes.card}>
            <Collapse in={toggleEdit}>
        <div className={classes.cardContentContainer}>
        <CardMedia
          component = "img"
          className={classes.media}
          image={`/images/show/${props.imagefilename}`} 
          // image={props.imagefilename} // This is where image goes I got it - it worked? check the slack chat - ok
          title="Room"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title} 
          </Typography>
          <Typography className={available? classes.available : classes.booked}>
            {available? "Available" : "Booked"}
          </Typography>
          <Typography>
            {`$${props.price} / hour`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.address}
            {/* {props.location.formattedAddress} */}
            <br/>
            <br/>
            {props.description}
          </Typography>
        </CardContent>
        </div>
      <div className={classes.buttonContainer}>
        <Button size="small" className={classes.saveButton} onClick={()=>setToggleEdit(!toggleEdit)}>
          Edit
        </Button>
        <Button  size="small" className={classes.cancelButton} onClick={clickDelete}>
          Delete
        </Button>
      </div>
      </Collapse>
      <Collapse in={!toggleEdit} orientation={'horizontal'}>
        <div className = {classes.updateForm}>
            <TextField fullWidth defaultValue={props.title} variant="outlined" label="Title" onChange={(e)=> setUpdatedRoomTitle(e.target.value)}/>
        
            <TextField fullWidth defaultValue={description} variant="outlined" label="Description" onChange={(e)=> setUpdatedRoomDescription(e.target.value)}/>
              
            <TextField fullWidth defaultValue={price} variant="outlined" label="$$$ / 10 mins" onChange={(e)=> setUpdatedRoomPrice(e.target.value)}/>

            <TextField fullWidth defaultValue={props.address} variant="outlined" label="Address" onChange={(e)=> setUpdatedRoomAddress(e.target.value)}/>
            
            
            {/* <TextField fullWidth defaultValue={props.location.formattedAddress} variant="outlined" label="Address" onChange={(e)=> setUpdatedRoomAddress(e.target.value)}/> */}

            {/* <TextField fullWidth defaultValue={imagefilename} variant="outlined" label="Img URL" onChange={(e)=> setUpdatedRoomImg(e.target.value)}/> */}
            <Typography>Image Preview:</Typography>
            <CardMedia 
            component= "img"
            className={classes.media}
            image={`/images/show/${props.imagefilename}`} 
            // image={updatedRoomImg? updatedRoomImg: imagefilename}
            label="Room Preview"/>

            <div className={classes.buttonContainer}>
                <Button 
                className={classes.saveButton}
                onClick = {clickUpdate}
                type="submit"
                >Save Changes</Button>
                <Button 
                className={classes.cancelButton}
                type="submit"
                onClick={()=> setToggleEdit(!toggleEdit)}
                >Cancel Edit</Button>
            </div>
        </div>
      </Collapse>
    </Card>
    );
}
