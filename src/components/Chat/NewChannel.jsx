import React,{useContext,useState} from "react";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import {ChannelsContext} from "../ContextApi/ChannelsContext"

const NewChannel = () => {
    const [channel,setChannel] = React.useState('')
    const [channels, setChannels, addChannel, delChannel,editChannel] = useContext(ChannelsContext)
    const [error, setError] = useState(false);

    const handleChange =(event)=>{
        const {value} = event.target
        setChannel(value)
        console.log(value);
    }

    const handleSubmit=(event)=>{
        event.preventDefault()
        if(channel === ""){
          setError(true)
        }
        else{
          setError(false)
          addChannel(channel)
          setChannel('')
        }
        
    }
  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Grid container direction="row" justify="flex-start">
          <TextField error={error} id="channel" label="New Channel" value={channel} onChange={handleChange} variant="outlined" fullWidth />      
      </Grid>
    </form>
  );
};

export default NewChannel;
