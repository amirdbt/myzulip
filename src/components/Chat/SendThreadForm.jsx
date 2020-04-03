import React, { useState, useContext } from "react";
import { OutlinedInput, FormControl, InputLabel } from "@material-ui/core";
import { UserContext } from "../ContextApi/UserContext";
import { useHistory } from "react-router-dom";

const SendThreadForm = ({ addMessage, conversation_id }) => {
  const [conversation, setConversation] = useState("");
  const [error, setError] = useState(false);
  const [user] = useContext(UserContext);
  let history = useHistory();
  let index = history.location.pathname.lastIndexOf("/");
  let path = history.location.pathname.slice(index + 1);
  const handleChange = event => {
    const { value } = event.target;
    setConversation(value);
    // console.log(value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    if (conversation === "") {
      setError(true);
    } else {
      addMessage(conversation, user._id, path, conversation_id);
      setConversation("");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="conversation">Send conversation</InputLabel>
          <OutlinedInput
            error={error}
            id="conversation"
            value={conversation}
            onChange={handleChange}
            labelWidth={60}
          />
        </FormControl>
      </form>
    </>
  );
};

export default SendThreadForm;
