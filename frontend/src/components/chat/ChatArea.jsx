import React, { Component } from "react";
import socket from "../../socket/socket";
import "../../App.css";
import "font-awesome/css/font-awesome.min.css";

export class ChatArea extends React.PureComponent {
  state = {
    message: "",
    messages: []
  };

  componentWillReceiveProps() {
    this.setState({
      message: "",
      messages: []
    });
  }

  sendMessage = () => {
    // const reciever = localStorage.getItem("reciever");
    const user = this.props.user;
    // console.log("reciever", reciever);

    socket.emit("startChat", {
      message: this.state.message,
      userId: this.props.userid,
      senderId: user._id
    });
    const oldMessage = this.state.messages;
    oldMessage.push({
      message: this.state.message,
      by: "me"
    });
    console.log(oldMessage);
  };

  componentDidMount() {
    socket.on("message", message => {
      const oldMessage = this.state.messages;
      oldMessage.push({
        message: message.message,
        by: "anotherPerson"
      });
      console.log(oldMessage);
    });
  }

  //as soon as the user start typing the state of message change
  setMessage = e => {
    this.setState({ message: e.target.value });
  };

  render() {
    return (
      <main className="chatArea">
        <div className="chatArea chatArea1">
          <div className="chatArea1-image-wrapper">
            <img
              className="chatArea1-image-wrapper-image"
              src="https://cdn.pixabay.com/photo/2018/05/01/07/47/animal-3364909__340.png"
            />
          </div>
          <div className="chatArea1-image-wrapper-text">
            <p className="chatArea1-image-wrapper-text-title">
              {this.props.userid}
            </p>
            <p className="chatArea1-image-wrapper-text-status">
              status holder...
            </p>
          </div>
          <h1 />
        </div>
        <div className="chatArea chatArea2">
          <ul className="chatArea2-messages">
            {this.state.messages.map(msg => (
              <li
                className={
                  msg.by !== "me"
                    ? "chatArea2-message right"
                    : "chatArea2-message left"
                }
              >
                <span>{msg.message}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="chatArea chatArea3">
          <form className="chatArea3-form">
            <i className="icon far fa-smile" />
            <input className="chatArea3-form-input" onInput={this.setMessage} />
            <button
              className="chatArea3-form-button"
              type="button"
              placeholder="Enter Your Message."
              onClick={this.sendMessage}
            >
              <i className="icon far fa-paper-plane" />
            </button>
          </form>
        </div>
      </main>
    );
  }
}

export default ChatArea;
