import React from "react";
import { Container } from "@material-ui/core";
import "./index.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Auth from "./components/Auth";
import PostDetails from "./components/PostDetails";

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile')) // panggil localstorage profile
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to={"/posts"}/>} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" component={PostDetails} />

          {/* jika localstorage profile null berarti akan diredirect ke /posts */}
          <Route path="/auth" exact component={() => (!user ? <Auth/> : <Redirect to={"/posts"}/>)} /> 
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
