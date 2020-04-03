import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { getJwt } from "../../helpers/jwt";

export const ChannelsContext = createContext();

export const ChannelsProvider = props => {
  const [channels, setChannels] = useState([]);
  const [channel, setChannel] = useState({});
  const [error, setError] = useState("");
  const [mess, setMess] = useState("");
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = getJwt();
  // console.log(token);
  useEffect(() => {
    fetchChannels();
  }, []);

  const fetchChannels = () => {
    setIsLoading(true);
    axios
      .post("https://banana-crumble-17466.herokuapp.com/channel/all")
      .then(res => {
        console.log(res.data.message);
        setChannels(res.data.message);
        setIsLoading(false);
      });
  };

  const addChannel = title => {
    axios
      .post("https://banana-crumble-17466.herokuapp.com/channel/new", {
        token,
        title
      })
      .then(result => console.log(result));
    // const newChannel = [...channels, { name }];
    // setChannels(newChannel);
  };

  const getChannel = id => {
    axios
      .get(`https://banana-crumble-17466.herokuapp.com/channel/${id}`)
      .then(res => {
        const chan = res.data;
        console.log(chan);
        setChannel(chan);
      });
  };

  const delChannel = id => {
    axios
      .delete(`https://banana-crumble-17466.herokuapp.com/channel/${id}`)
      .then(res => {
        console.log(res);
        setMess(res.data.message);
      });
  };

  const editChannel = (id, title) => {
    axios
      .put(`https://banana-crumble-17466.herokuapp.com/channel/${id}`, {
        title
      })
      .then(res => console.log(res));
  };

  const addUser = (channel_id, user_id) => {
    axios
      .post("https://banana-crumble-17466.herokuapp.com/channel/add-user", {
        token,
        channel_id,
        user_id
      })
      .then(res => console.log(res))
      .catch(err => {
        setErr(true);
        console.log(err.response.data.message);
        setError(err.response.data.message);
      });
  };

  return (
    <ChannelsContext.Provider
      value={[
        channels,
        setChannels,
        addChannel,
        delChannel,
        editChannel,
        getChannel,
        channel,
        addUser,
        error,
        err,
        mess,
        isLoading
      ]}
    >
      {props.children}
    </ChannelsContext.Provider>
  );
};
