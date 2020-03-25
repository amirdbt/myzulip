import React from "react";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";

const NewChannel = ({addChannel}) => {
    const [channel,setChannel] = React.useState('')

    const handleChange =(event)=>{
        const {value} = event.target
        setChannel(value)
        console.log(value);
    }

    const handleSubmit=(event)=>{
        event.preventDefault()
        addChannel(channel)
        setChannel('')
    }
  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Grid container direction="row" justify="flex-start">
          <TextField id="channel" label="New Channel" value={channel} onChange={handleChange} variant="outlined" fullWidth />      
      </Grid>
    </form>
  );
};

export default NewChannel;
