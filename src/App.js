import React from "react";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn"
import {Switch,Route} from "react-router-dom"

function App() {
  return (
    <Switch>
      <Route exact path="/" component={SignUp} />
      <Route path="/signin" component={SignIn} />
    </Switch>
  );
}

export default App;
