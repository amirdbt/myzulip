import React, { useState } from "react";
import ChannelList from "./ChannelList";
import NewChannel from "./NewChannel";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";
import { Grid } from "@material-ui/core";
import Navbar from "../Navbar/Navbar";
import { useHistory } from "react-router-dom";
import { getJwt } from "../../helpers/jwt";

const Chat = () => {
  const token = getJwt();
  let history = useHistory();

  return (
    <div>
      {token ? (
        <div>
          <Navbar />
          <Grid container justify="center">
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={2}>
                  <ChannelList />
                  <NewChannel />
                </Grid>
                <Grid item xs={10}>
                  <MessageList />
                  <SendMessageForm />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      ) : (
        history.push("/signin")
      )}
    </div>
  );
};

export default Chat;
