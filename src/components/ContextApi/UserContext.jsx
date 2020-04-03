import React, { useState, createContext,useEffect } from "react";
import axios from "axios"
import {getJwt} from "../../helpers/jwt"
import {useHistory} from "react-router-dom"

export const UserContext = createContext();
export const UserProvider = props => {
  const [user,setUser] = useState({})
      const token = getJwt()
    useEffect(()=>{
        fetchUser()
    },[])
    const fetchUser = () =>{
      axios.get(`https://banana-crumble-17466.herokuapp.com/users/user/${token}`)
        .then(res => {
          console.log(res.data.message)
          setUser(res.data.message)
        })
    }
      const updateUser =(phone,state,country)=>{
          axios.put(`https://banana-crumble-17466.herokuapp.com/users/user/${token}`,{
              country,
              phone,
              state
          })
          .then(res => console.log(res))
      
    }
    let history = useHistory()
    const deleteUser =() =>{
      axios.delete(`https://banana-crumble-17466.herokuapp.com/users/user/${token}`)
      .then(res => {
        console.log(res)
        history.push("/")
      })
    }
  

  return <UserContext.Provider value={[user,setUser,updateUser,deleteUser]}>{props.children}</UserContext.Provider>;
};
