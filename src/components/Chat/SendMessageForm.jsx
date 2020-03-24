import React,{useState} from 'react'
import {OutlinedInput,FormControl,InputLabel} from "@material-ui/core"

const SendMessageForm = ({addMessage}) => {
    const [message, setMessage] = useState('')

    const handleChange =(event) =>{
        const {value} = event.target 
        setMessage(value)
        // console.log(value);
    }
    const handleSubmit = event =>{
        event.preventDefault()
        addMessage(message)
        setMessage('')
    }

    return (
      <form onSubmit={handleSubmit}>
          <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="message">Send Message</InputLabel>
                <OutlinedInput id="message" value={message} onChange={handleChange} labelWidth={60} />
          </FormControl>
      </form>
    )
}

export default SendMessageForm
