import React, { useState, createContext,useEffect } from "react";
import {getJwt} from "../../helpers/jwt"
export const UserContext = createContext();

export const UserProvider = props => {
  const [user,setUser] = useState({})

      const token = getJwt()
    useEffect(()=>{
        fetchUser()
    },[])
    const fetchUser =async () =>{
      const response = await fetch(`http://localhost:3001/users/${token}`)
      const data = await response.json()
      console.log(data);
      setUser(data)
    }
      const updateUser =(phone,state,country)=>{
          setUser({
              ...user,
              phone,
              state,
              country
          })
      
    }
    const removePicture = () => {
        setUser({...user,img: null})
   
      };

  return <UserContext.Provider value={[user,setUser,updateUser,removePicture]}>{props.children}</UserContext.Provider>;
};
