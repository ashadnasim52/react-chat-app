import React, { Component } from "react";
import { Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";
import { User } from "./User";
import socket from "../../socket/socket";
import { ChatArea } from "./ChatArea";
import "../../App.css";

export class Chat extends Component {
  state = {
    users: [],
    reciever: "",
    onlineUsers: []
  };
  setReciver = rec => {
    this.setState({ reciever: rec });
  };

  componentDidMount() {
    //getting the saved user from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("local storage", user);

    //emiting the userid of user to the server
    socket.emit("userId", user._id);

    socket.on("onlineUser", onlineUser => {
      console.log("onlineUser", onlineUser);
      this.setState({ onlineUsers: onlineUser });
    });
    socket.on("dis", () => {
      console.log("====================================");
      console.log("hu");
      console.log("====================================");
    });

    socket.emit("newUserConnected", user);
    //not working
    socket.on("socketIDSet", () => {
      console.log("i need to proceed.....");

      // socket.emit("newUserConnected", user);
    });
    //ssending users

    //getting notified of new user  as server is sending and then getting all saved user from server using api
    //TODO need to chage this
    socket.on("newuser", () => {
      console.log("new user added");

      axios
        .get("/getUser")
        .then(res => {
          console.log(res.data);
          this.setState({ users: res.data });
        })
        .catch(err => {
          console.log(err);
        });
    });

    //Getinng all user as soon as signed in
    axios
      .get("/getUser")
      .then(res => {
        console.log(res.data);
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    socket.disconnect();
  }

  render() {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
      <main className="chat-section grid">
        <section className="chat-sections chat-section1">
          <div className="Switch-user">
            <p>All Users</p>
          </div>
          <ul className="chat-users-holder">
            {this.state.users.map(user => (
              <User
                user={user}
                socketId={user.socket}
                key={user.id}
                setreciever={this.setReciver}
              />
            ))}
          </ul>
        </section>
        <section className="chat-sections chat-section2">
          <ChatArea userid={this.state.reciever} user={user} />
        </section>
        <section className="chat-sections chat-section3">
          <div className="Switch-user">
            <p>Online User</p>
          </div>
          <ul className="chat-users-holder">
            {this.state.onlineUsers.map(onlineuser => (
              <User
                user={onlineuser}
                socketId={onlineuser.socket}
                key={onlineuser.id}
                setreciever={this.setReciver}
              />
            ))}
          </ul>
        </section>
      </main>
    );
  }
}

export default Chat;
