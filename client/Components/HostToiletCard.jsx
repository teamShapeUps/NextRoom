import React, { useState } from 'react';
import {makeStyles, 
        Card, 
        TextField, 
        CardActionArea, 
        CardActions, 
        CardContent, 
        CardMedia, 
        Button, 
        Typography,
        Collapse} from '@material-ui/core';
import { BorderStyle } from '@material-ui/icons';


const useStyles = makeStyles({
  card: {
    minWidth: 800,
    margin: "25px 0 25px 0",
  },
  media: {
    height: 350,
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
    justifyContent: 'flex-end'
  },
  updateForm: {
    padding: "50px 15px 15px 15px"
  },
  button:{

  },

});


export default function HostToiletCard(props){

    const {_id, available} = props;
    //pass in props from query
    const classes = useStyles();

    const [toggleEdit, setToggleEdit] = useState(true);


    return(
        // <TextField defaultValue={props.text}/>
        <Card className={classes.card}>
            <Collapse in={toggleEdit}>
        <CardMedia
          component = "img"
          className={classes.media}
          image={props.imageFileName}
          title="Bathroom"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {_id} 
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
      <div className={classes.buttonContainer}>
        <Button size="small" className={classes.button} onClick={()=> setToggleEdit(!toggleEdit)}>
          Edit
        </Button>
        <Button size="small" className={classes.button}>
          Delete
        </Button>
      </div>
      </Collapse>
      <Collapse in={!toggleEdit} orientation={'horizontal'}>
        <div className = {classes.updateForm}>
            <TextField fullWidth defaultValue={props._id} />
                    <br></br>
                    <br></br>
                    <br></br>
            <TextField fullWidth defaultValue={props.imageFileName} /> 
                    <br></br>
                    <br></br>
                    <br></br>
            <div className={classes.buttonContainer}>
                <Button 
                type="submit"
                >Save Changes</Button>
                <Button 
                type="submit"
                onClick={()=> setToggleEdit(!toggleEdit)}
                >Cancel Edit</Button>
            </div>
        </div>
      </Collapse>
    </Card>
    );
}
