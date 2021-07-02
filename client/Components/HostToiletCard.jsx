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


const useStyles = makeStyles({
  card: {
    minWidth: 800,
  },
  media: {
    height: 140,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  deleteButton:{

  },
  editButton:{

  }
});


export default function HostToiletCard(props){
    //pass in props from query
    const classes = useStyles();

    const [toggleEdit, setToggleEdit] = useState(true);


    return(
        // <TextField defaultValue={props.text}/>
        <Card className={classes.card}>
            <Collapse in={toggleEdit}>
        <CardMedia
          className={classes.media}
          image={props.image}
          title="Bathroom"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </CardContent>
      <div className={classes.buttonContainer}>
        <Button size="small" color="primary" onClick={()=> setToggleEdit(!toggleEdit)}>
          Edit
        </Button>
        <Button size="small" color="primary">
          Delete
        </Button>
      </div>
      </Collapse>
      <Collapse in={!toggleEdit} orientation={'horizontal'}>
        <TextField fullWidth defaultValue={props.title} />
                <br></br>
                <br></br>
                <br></br>
        <TextField fullWidth defaultValue={props.description} /> 
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
      </Collapse>
    </Card>
    );
}
