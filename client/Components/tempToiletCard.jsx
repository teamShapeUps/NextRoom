import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


// schema is:
// bathroomId,
// bathroomCoords,
// imageUrl,
// imageTitle,
// descriptionTitle,
// descriptionBody,
// toiletAddress
// toiletAddress2
export default function ToiletCard (props) {
  const {
    imageUrl,
    imageTitle,
    descriptionTitle,
    descriptionBody,
    toiletAddress,
    toiletAddress2} = props.bathroom;

    console.log(`props.bathroom of tempToiletCard is ${JSON.stringify(props.bathroom, null, 2)}`);

    console.log(`descriptionBody is ${descriptionBody}`)

    const useStyles = makeStyles({
      card: {
        maxWidth: 245,
        height: 145,
      },
    });

    const classes = useStyles();

    return (
      <div className={classes.card}>
      <div>{imageUrl}</div>
      <div>{imageTitle}</div>
      <div>{descriptionTitle}</div>
      <div>{descriptionBody}</div>
      <div>{toiletAddress}</div>
      <div>{toiletAddress2}</div>
      </div>      
    )
}