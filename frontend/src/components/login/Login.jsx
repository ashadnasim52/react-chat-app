import React, { Component } from "react";
import axios from "axios";
import vector from "../../images/connect.svg";

export class Login extends Component {
  state = {
    password: "",
    email: ""
  };
  changeWord = (env, last) => {
    this.setState({ [env.target.name]: env.target.value });
  };
  gotoSignup = () => {
    //Sending to siginUp componetnt
    this.props.history.push("/signup");
  };
  doLogin = () => {
    //Sigin user on the server or database
    axios
      .post("/signin", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        console.log(res);
        //As soon as the sigin complete
        //TODO right now not checking responce
        //storing the sender in localStorage
        //Rightnow saving everything
        localStorage.setItem("user", JSON.stringify(res.data.user));
        //Sending User to chat components (route)
        this.props.history.push({
          pathname: "/chat"
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="grid-2">
        <section className="flex-col">
          <main className="flex-col">
            <div className="login-container flex">
              <h3>Sign In Please</h3>
              <p>Talk to Anyone Anytime Anywhere...</p>
            </div>
            <form className="form">
              <div className="input">
                <label for="exampleEmail">Email</label>

                <input
                  onInput={this.changeWord}
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="email"
                />
              </div>
              <div className="input">
                <label for="password">Password</label>
                <input
                  onInput={this.changeWord}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                />
              </div>
            </form>
            <button className="button" type="button" onClick={this.doLogin}>
              SUBMIT
            </button>
          </main>
          <div>
            <span>Do not have an account ,</span>
            <span className="goto" onClick={this.gotoSignup}>
              Signup here
            </span>
          </div>
        </section>
        <div className="image">
          <img src={vector} alt="" />
        </div>
      </div>
    );
  }
}

export default Login;
