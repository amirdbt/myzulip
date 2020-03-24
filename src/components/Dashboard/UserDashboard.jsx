import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import moment from 'moment'
import {Card,CardActions,CardContent,Divider,Button,Typography,LinearProgress,Avatar} from '@material-ui/core'

const useStyles = makeStyles(theme=>({
  root:{},
  details:{
    display: 'flex',
  },
  avatar:{
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}))


 const UserDashboard = (props) => {
   const {className,...rest} = props
   const classes = useStyles()
  return (
   <Card {...rest} className={classes.root}>
    <CardContent>
    <div className={classes.details}>
       <div>
         <Typography gutterBottom variant="h2">
            Amir Dambatta
         </Typography>
         <Typography  variant="body1" color="textSecondary">
            FCT, Nigeria
         </Typography>
         <Typography  variant="body1" color="textSecondary">
            {moment().format('hh:mm A')} ('GMT+1')
         </Typography>
       </div>

       <Avatar className={classes.avatar} src="https://react-material-dashboard.devias.io/images/avatars/avatar_11.png" />
    </div>
    <div className={classes.progress}>
      <Typography variant="body1">Profile Completeness: 70%</Typography>
      <LinearProgress value={70} variant="determinate" />
    </div>
    </CardContent>
    <Divider />
  <CardActions>
  <Button color="primary" variant="text">Upload picture</Button>
    <Button   variant="text">Remove picture</Button>
  </CardActions>
   </Card>
  )
}

export default UserDashboard