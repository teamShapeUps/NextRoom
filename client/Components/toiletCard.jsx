import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 300,
  },
});

export default function ToiletCard(props) {
  const {
    imageUrl,
    imageTitle,
    descriptionTitle,
    descriptionBody,
    toiletAddress,
    toiletAddress2} = props.bathroom;
  
  const classes = useStyles();

  console.log(toiletAddress);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://royaltoiletry.com/wp-content/uploads/2020/07/royal-style-gold-toilet-5.jpg"
          title="Toilet fit for the GODS"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Golden Comode
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            The greates seat you'll ever meet. Come, experience nirvana right down the street. The Golden Comode.
          </Typography>
          <Typography color="textSecondary" component="p">
            {props.toiletAddress}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          RESERVE
        </Button>
      </CardActions>
    </Card>
  );
}
