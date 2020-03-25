import React from "react";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import User from "./components/Dashboard/User";
import AllUsers from "./components/AllUsers/AllUsers";
import Chat from "./components/Chat/Chat";
import { Switch, Route } from "react-router-dom";
import {UsersProvider} from "./components/ContextApi/UsersContext"

function App() {
  return (
   <UsersProvider>
      <Switch>
      <Route exact path="/" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <Route exact path="/users" component={AllUsers} />
      <Route path="/dashboard" component={User} />
      <Route path="/chat" component={Chat} />
      <Route path="/chat/:id" component={Chat} />
    </Switch>
   </UsersProvider>
  );
}

export default App;
