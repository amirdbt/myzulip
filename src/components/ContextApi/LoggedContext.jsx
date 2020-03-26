import React, { useState, createContext } from "react";

export const LoggedContext = createContext();

export const LoggedProvider = props => {
    const [isLogged, setIsLogged] = useState(false);
    
    const [token, setToken] = useState("");
      

  return <LoggedContext.Provider value={[isLogged,setIsLogged,token,setToken]}>{props.children}</LoggedContext.Provider>;
};
