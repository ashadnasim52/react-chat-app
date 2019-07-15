import React, { Component } from "react";
import socket from "../../socket/socket";
import "../../App.css";
export class User extends Component {
  state = {
    message: "no recent chat....."
  };

  setreciever = this.props.setreciever;

  componentDidMount() {
    // let random = Math.random();
    // this.setState({ message: random });

    socket.on("message", message => {
      // console.log("message", message);

      console.log("user", this.props.user);

      if (message.senderId === this.props.user._id) {
        console.log(
          `message from user section by ${this.props.user._id}`,
          message.message
        );
        this.setState({ message: message.message });
      }
    });
  }

  showId = () => {
    console.log(this.props.user._id);

    this.setreciever(this.props.user._id);
    //logically sending message to sender
    //TODO just need to set varaibvle of sender
    //locl sorage will be good

    localStorage.setItem("reciever", this.props.user._id);
  };
  render() {
    const { firstName, lastName, id, email } = this.props.user;

    return (
      <li onClick={this.showId} key={id} className="user">
        <div className="user-image-container">
          <img
            className="user-image-container-image"
            src="https://cdn.pixabay.com/photo/2018/05/01/07/47/animal-3364909__340.png"
          />
        </div>
        <div className="user-details">
          <h3 className="user-details-name">{firstName}</h3>
          <p className="user-details-lastChat">{this.state.message}</p>
        </div>
      </li>
    );
  }
}

export default User;
