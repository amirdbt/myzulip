import React,{useState} from 'react'
import {OutlinedInput,FormControl,InputLabel} from "@material-ui/core"


const SendThreadForm = ({addConversation}) => {
    const [conversation, setConversation] = useState('')
    const [error, setError] = useState(false);
 
    const handleChange =(event) =>{
        const {value} = event.target 
        setConversation(value)
        // console.log(value);
    }
    const handleSubmit = event =>{
        event.preventDefault()
        if(conversation === "")
        {
          setError(true)
        }
        else{
          addConversation(conversation)
        setConversation('')
        }
        
    }

    return (
        <>
      <form onSubmit={handleSubmit}>
          <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="conversation">Send conversation</InputLabel>
                <OutlinedInput error={error} id="conversation" value={conversation} onChange={handleChange} labelWidth={60} />
          </FormControl>
      </form>
  
      </>
    )
}

export default SendThreadForm
