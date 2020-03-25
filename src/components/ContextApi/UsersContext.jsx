import React, { useState, useEffect, createContext } from "react";

export const UsersContext = createContext();

export const UsersProvider = props => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchusers();
  }, []);

  const fetchusers = async () => {
    setIsLoading(true);
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    setUsers(data);
    setIsLoading(false);
  };
  return <UsersContext.Provider value={[users,setUsers,isLoading]}>{props.children}</UsersContext.Provider>;
};
