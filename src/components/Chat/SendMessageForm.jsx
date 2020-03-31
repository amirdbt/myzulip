import React,{useState} from 'react'
import {OutlinedInput,FormControl,InputLabel} from "@material-ui/core"
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

const SendMessageForm = ({addMessage}) => {
    const [message, setMessage] = useState('')
    const [chosenEmoji, setChosenEmoji] = useState('')
    const [showEmoji, setShowEmoji] = useState(false)
    const [error, setError] = useState(false);

    const EmojiOn =() =>{
      setShowEmoji(!showEmoji)
    }

    const onEmojiClick = (event) =>{
      setChosenEmoji(event.native)
      setMessage(message+chosenEmoji)
    }
    const handleChange =(event) =>{
        const {value} = event.target 
        setMessage(value)
        // console.log(value);
    }
    const handleSubmit = event =>{
        event.preventDefault()
        if(message === "")
        {
          setError(true)
        }
        else{
          addMessage(message)
          setMessage('')
        }
        
    }

    return (
        <>
      <form onSubmit={handleSubmit}>
          <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="message">Send Message</InputLabel>
                <OutlinedInput id="message" error={error} value={message} onChange={handleChange} labelWidth={60} />
          </FormControl>
      </form>
      <span>
       { showEmoji ? (
        <span style={styles.emojiPicker}>  <Picker onSelect={onEmojiClick} title="MyZulip" /></span>
       ): (
         <div></div>
       )}
        <p style={styles.getEmojiButton} onClick={EmojiOn}>
            {String.fromCodePoint(0x1f60a)}
          </p>
      </span>
      </>
    )
}

export default SendMessageForm
const styles = {
  getEmojiButton: {
    cssFloat: "right",
    border: "solid",
    margin: 0,
    cursor: "pointer",
    bottom: 10,
  },
  emojiPicker: {
    position: "absolute",
    bottom: 10,
    right: 0,
    cssFloat: "right",
    marginLeft: "200px"
  }
};
