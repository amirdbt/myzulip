import React, { useState, useEffect, createContext } from "react";
import axios from "axios"

export const UsersContext = createContext();

export const UsersProvider = props => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userRole, setUserRole] = useState('User')

  const changeRole =() =>{
    if(userRole === "User")
    {
      setUserRole('Admin')
    }
    else{
      setUserRole('User')
    }
    
  }

  useEffect(() => {
    fetchusers();
  }, []);

  const fetchusers = () => {
    setIsLoading(true);
    axios.get("https://banana-crumble-17466.herokuapp.com/users/getall")
    .then(res => {
      console.log(res.data.message);
      setUsers(res.data.message)
      setIsLoading(false);
    })
   
  };

  const deletUser = (id) =>{
    axios.delete(`https://banana-crumble-17466.herokuapp.com/users/user/${id}`)
    .then(res =>{
      console.log(res);

    })
  }
  return <UsersContext.Provider value={[users,setUsers,isLoading,userRole,changeRole,deletUser]}>{props.children}</UsersContext.Provider>;
};
