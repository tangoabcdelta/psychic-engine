import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={(props) => <Home {...props} />} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
