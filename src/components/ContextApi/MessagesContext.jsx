import React,{createContext,useState,useEffect} from 'react'

export const MessagesContext = createContext()

export const MessagesProvider =props=>{
    const [messages, setMessages] = useState([
        {
          channelid: 0,
          firstname: "Amir",
          lastname: "Dambatta",
          email: "ahmedhassan007873@gmail.com",   
          text: "Hey, how is it going?"
        },
        {
          channelid: 0,
          firstname: "Sadiq",
          lastname: "Dambatta",
          email: "sadd@yahoo.com",
          text: "Great! How about you?"
        },
        {
          channelid: 1,
          firstname: "Cristiano",
          lastname: "Ronaldo",
          email: "yuyu@yahoo.com",
          text: "Good to hear! I am great as well"
        }
      ]);
    
      const addMessage = (channelid,firstname,lastname,email,text) => {
        const newMessages = [...messages, { channelid,firstname,lastname,email,text }];
        setMessages(newMessages);
      };
    
      const delMessage = index => {
        const newMessages = [...messages];
        newMessages.splice(index, 1);
        setMessages(newMessages);
      };
    
      const editMessage = (index,channelid, firstname,lastname,email,text) => {
        const newMessages = [...messages];
        newMessages.splice(index, 1, {channelid, firstname,lastname,email,text });
        setMessages(newMessages);
      };
    

return <MessagesContext.Provider value={[messages,addMessage,delMessage,editMessage]}>{props.children}</MessagesContext.Provider>
}