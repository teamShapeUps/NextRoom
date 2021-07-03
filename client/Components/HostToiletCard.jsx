import React, { useState } from 'react';
import {makeStyles, 
        Card, 
        TextField, 
        CardContent, 
        CardMedia, 
        Button, 
        Typography,
        Collapse} from '@material-ui/core';


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


export default function HostToiletCard(props){

    const {_id, available, title, description, imageFileName, address, zip, price} = props;
    //pass in props from query
    const classes = useStyles();

    const [toggleEdit, setToggleEdit] = useState(true);

    const [updatedBathTitle, setUpdatedBathTitle] = useState('');
    const [updatedBathDescription, setUpdatedBathDescription] = useState('');
    const [updatedBathPrice, setUpdatedBathPrice] = useState('');
    const [updatedBathAddress, setUpdatedBathAddress] = useState('');
    //const [updatedBathZip, setUpdatedBathZip] = useState('');
    const [updatedBathImg, setUpdatedBathImg] = useState('');

    const handleDeleteBathroom = function(){
        //delete bathroom using mongo ID. Accessible like this:
        console.log(_id);
        console.log(props.location.formattedAddress);
    }


    return(
        // <TextField defaultValue={props.text}/>
        <Card className={classes.card}>
            <Collapse in={toggleEdit}>
        <div className={classes.cardContentContainer}>
        <CardMedia
          component = "img"
          className={classes.media}
          image={props.imageFileName}
          title="Bathroom"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title} 
          </Typography>
          <Typography className={available? classes.available : classes.booked}>
            {available? "Available" : "Booked"}
          </Typography>
          <Typography>
              Price Goes here 
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.address}
            {props.description}
          </Typography>
        </CardContent>
        </div>
      <div className={classes.buttonContainer}>
        <Button size="small" className={classes.saveButton} onClick={()=> setToggleEdit(!toggleEdit)}>
          Edit
        </Button>
        <Button  size="small" className={classes.cancelButton} onClick={handleDeleteBathroom}>
          Delete
        </Button>
      </div>
      </Collapse>
      <Collapse in={!toggleEdit} orientation={'horizontal'}>
        <div className = {classes.updateForm}>
            <TextField fullWidth defaultValue={props.title} variant="outlined" label="Title" onChange={(e)=> setUpdatedBathTitle(e.target.value)}/>
        
            <TextField fullWidth defaultValue={description} variant="outlined" label="Description" onChange={(e)=> setUpdatedBathDescription(e.target.value)}/>
              
            <TextField fullWidth defaultValue={price} variant="outlined" label="$$$ / 10 mins" onChange={(e)=> setUpdatedBathPrice(e.target.value)}/>

            <TextField fullWidth defaultValue={address} variant="outlined" label="Address" onChange={(e)=> setUpdatedBathAddress(e.target.value)}/>

            <TextField fullWidth defaultValue={imageFileName} variant="outlined" label="Img URL" onChange={(e)=> setUpdatedBathImg(e.target.value)}/>
            <Typography>Image Preview:</Typography>
            <CardMedia 
            component= "img"
            className={classes.media}
            image={updatedBathImg? updatedBathImg: imageFileName}
            label="Bathroom Preview"/>

            <div className={classes.buttonContainer}>
                <Button 
                className={classes.saveButton}
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
