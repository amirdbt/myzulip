import React, { useState } from "react";
import ChannelList from "./ChannelList";
import NewChannel from "./NewChannel";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";
import { Grid } from "@material-ui/core";
import Navbar from "../Navbar/Navbar"
import {useHistory} from "react-router-dom"
import {getJwt} from "../../helpers/jwt"
import ConversationList from "./ConversationList"

const Chat = () => {
  const token = getJwt()
  let history = useHistory()
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
  
  ]);

  const addMessage = text => {
    const newMessages = [...messages, { text }];
    setMessages(newMessages);
  };

  const delMessage = index => {
    const newMessages = [...messages];
    newMessages.splice(index, 1);
    setMessages(newMessages);
  };

  const editMessage = (index, text) => {
    const newMessages = [...messages];
    newMessages.splice(index, 1, { text });
    setMessages(newMessages);
  };

  const addChannel = name => {
    const newChannel = [...channels, { name }];
    setChannels(newChannel);
  };

  const delChannel = index => {
    const newChannels = [...channels];
    newChannels.splice(index, 1);
    setChannels(newChannels);
  };

    const editChannel = (index,name) =>{
      const newChannels = [...channels]
      newChannels.splice(index,1,{name})
      setChannels(newChannels)
    }
  return (
    <div>
    {
      token ? (<div>  <Navbar />
        <Grid container justify="center">
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={2}>
                <ChannelList editChannel={editChannel} delChannel={delChannel} channels={channels} />
                <NewChannel addChannel={addChannel} />
              </Grid>
              <Grid item xs={8}>
                <MessageList
                  editMessage={editMessage}
                  delMessage={delMessage}
                  messages={messages}
                />
                <SendMessageForm addMessage={addMessage} />
              </Grid>
              <Grid item xs={2}>
                  <ConversationList  />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        </div>
        ): (
          history.push("/signin")
        )
    }
    </div>
  );
};

export default Chat;
