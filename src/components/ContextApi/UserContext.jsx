import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = props => {
    const [user, setUser] = useState({
        firstname: "Jane",
        lastname: "Doe",
        email: "jane.doe@yahoo.com",
        img:
        "https://react-material-dashboard.devias.io/images/avatars/avatar_11.png",
        phone: "0809880998",
        state: "Abuja",
        country: "Nigeria",
       
      });
      const updateUser =(phone,state,country)=>{
          setUser({
              ...user,
              phone,
              state,
              country
          })
        // const userObj = user
        // userObj["firstname"] =  user.firstname
        // userObj["lastname"] =  user.lastname
        // userObj["email"] =  user.email
        // userObj["img"] =  user.img
        // userObj["phone"] = phone
        // userObj["state"] = state
        // userObj["country"] = country
        // setUser(userObj)
        // console.log(user);
    }
    const removePicture = () => {
        setUser({...user,img: null})
        // const userObj = user;
        // userObj["firstname"] =  user.firstname
        // userObj["lastname"] =  user.lastname
        // userObj["email"] =  user.email
        // userObj["img"] = null;
        // userObj["phone"] =  user.phone
        // userObj["state"] =  user.state
        // userObj["country"] =  user.country
        // setUser(userObj);
      };

  return <UserContext.Provider value={[user,setUser,updateUser,removePicture]}>{props.children}</UserContext.Provider>;
};
