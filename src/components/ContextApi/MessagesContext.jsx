import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { getJwt } from "../../helpers/jwt";

export const MessagesContext = createContext();

export const MessagesProvider = props => {
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mess, setMess] = useState("");
  const [messAlert, setMessAlert] = useState(false);
  useEffect(() => {
    getMessages();
    getConversations();
    // getConversation()
  }, []);

  const token = getJwt();
  let history = useHistory();
  let index = history.location.pathname.lastIndexOf("/");
  let path = history.location.pathname.slice(index + 1);

  const getMessages = () => {
    setIsLoading(true);
    axios
      .get(`https://banana-crumble-17466.herokuapp.com/channel/${path}`)
      .then(res => {
        const mes = res.data.message;
        console.log(mes);
        setMessages(mes);
        setIsLoading(false);
      });
  };

  const addMessage = (msg, user, channel_id, conversation_id) => {
    axios
      .post("https://banana-crumble-17466.herokuapp.com/message/new", {
        token,
        msg,
        user,
        channel_id,
        conversation_id
      })
      .then(res => console.log(res));
  };

  const delMessage = id => {
    axios
      .delete(`https://banana-crumble-17466.herokuapp.com/message/${id}`)
      .then(res => console.log(res));
  };

  const editMessage = (id, msg) => {
    axios
      .put(`https://banana-crumble-17466.herokuapp.com/message/${id}`, {
        msg
      })
      .then(res => console.log(res));
  };

  const getConversations = () => {
    axios
      .post("https://banana-crumble-17466.herokuapp.com/conversation/all")
      .then(res => {
        console.log(res.data.message);
        // setConversations(res.data.message)
      });
  };

  const getConversation = id => {
    axios
      .get(`https://banana-crumble-17466.herokuapp.com/conversation/${id}`)
      .then(res => {
        console.log(res.data.message.message);
        setConversations(res.data.message.message);
      });
  };

  const addConversation = msg_id => {
    axios
      .post("https://banana-crumble-17466.herokuapp.com/conversation/new", {
        token,
        msg_id
      })
      .then(res => {
        console.log(res.data.message._id);
        // setConversation_id(res.data.message._id)
      });
  };

  const editConversation = (id, msg) => {
    axios
      .put(`https://banana-crumble-17466.herokuapp.com/message/${id}`, {
        msg
      })
      .then(res => console.log(res));
  };

  const deleteConversation = id => {
    axios
      .delete(`https://banana-crumble-17466.herokuapp.com/message/${id}`)
      .then(res => {
        setMessAlert(true);
        console.log(res.data.message);
        setMess(res.data.message);
      });
  };

  return (
    <MessagesContext.Provider
      value={[
        messages,
        addMessage,
        delMessage,
        editMessage,
        conversations,
        addConversation,
        getConversation,
        isLoading,
        deleteConversation,
        editConversation,
        mess,
        messAlert
      ]}
    >
      {props.children}
    </MessagesContext.Provider>
  );
};
