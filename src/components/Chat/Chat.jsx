import React, { useState } from "react";
import ChannelList from "./ChannelList";
import NewChannel from "./NewChannel";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";
import { Grid } from "@material-ui/core";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
       
      text: "Hey, how is it going?"
    },
    {
     
      text: "Great! How about you?"
    },
    {
      
      text: "Good to hear! I am great as well"
    }
  ]);

  const [channels, setChannels] = React.useState([
    {
      name: "bugs"
    },
    {
      name: "general"
    },
    {
      name: "polls"
    },
    {
      name: "software-development"
    }
  ]);

  const addMessage = text => {
    const newMessages = [...messages, { text }];
    setMessages(newMessages);

  };
  const addChannel = name => {
    const newChannel = [...channels, { name }];
    setChannels(newChannel);

  };

  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={2}>
              <ChannelList channels={channels} />
              <NewChannel addChannel={addChannel} />
            </Grid>
            <Grid item xs={10}>
              <MessageList messages={messages} />
              <SendMessageForm addMessage={addMessage} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
