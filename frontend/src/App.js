import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Nav } from "reactstrap";

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { Signup } from "./components/signup/Signup";
import { Login } from "./components/login/Login";
import { Chat } from "./components/chat/Chat";

class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navigation">
          <Link className="navs" to="/chat">
            Chat
          </Link>
          <Link className="navs current" to="/">
            siginin
          </Link>
          <Link className="navs" to="/signup">
            siginUp
          </Link>
          <Link className="navs" to="/about">
            About
          </Link>
          <Link className="navs" to="contact">
            Contact
          </Link>
          <Link className="navs" to="faq">
            FAQ
          </Link>
          <div className="img">
            <img
              className="image-user"
              src="https://cdn.pixabay.com/photo/2019/03/29/17/06/strawberries-4089616__340.jpg"
              alt="user"
            />
          </div>
        </nav>
        <Switch>
          <Route expact path="/signup" component={Signup} />
          <Route expact path="/chat" component={Chat} />
          <Route expact path="/" component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default App;
