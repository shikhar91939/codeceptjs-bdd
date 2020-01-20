import React from "react"
import BDD from "../images/BDD.png";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
  
    card: {
      height: '100%',
      width: '100%',
      marginTop: '1em',
      // marginBottom: '1em'
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: 'red',
    },
    title: {
      fontSize: 18,
      borderTopRightRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
    }
}));

export default function AppCard({ image, title, description, link }) {
    const classes = useStyles();
  return (
    <Card className={classes.card}>
        <CardActionArea href={link} target="_blank">
            <CardMedia
                component="img"
                alt={title}
                height="100%"
                width="100%"
                image={image}
                title={title}
            />

            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                {title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {description}
                </Typography>
            </CardContent>

        </CardActionArea>

        <CardActions>
            <Button size="small" color="primary" 
            target="_blank"
            href={link}>
                Learn More
            </Button>
        </CardActions>
  </Card>
  );
}
