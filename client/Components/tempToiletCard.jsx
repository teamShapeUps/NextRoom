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

    console.log(`props.bathroom of tempToiletCard is ${JSON.stringify(props.bathroom, null, 2)}`)

    const useStyles = makeStyles({
      root: {
        maxWidth: 245,
      },
    });

    const classes = useStyles();

    return (
      <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={imageTitle}
          height="240"
          image={imageUrl}
          title={imageTitle}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {descriptionTitle}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {descriptionBody}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Reserve
        </Button>
      </CardActions>
    </Card>
    </>
    )
}