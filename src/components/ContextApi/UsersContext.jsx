import React, { useState, useEffect, createContext } from "react";

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

  const fetchusers = async () => {
    setIsLoading(true);
    const response = await fetch("http://localhost:3001/users");
    const data = await response.json();
    setUsers(data);
    console.log(data);
    setIsLoading(false);
  };
  return <UsersContext.Provider value={[users,setUsers,isLoading,userRole,changeRole]}>{props.children}</UsersContext.Provider>;
};
