import React, { Component } from "react";
import "../../App.css";

import work from "../../images/group.svg";

import axios from "axios";

export class Signup extends Component {
  state = {
    firstName: "",
    lastName: "",
    password: "",
    email: ""
  };
  changeWord = (env, last) => {
    this.setState({ [env.target.name]: env.target.value });
  };
  gotoSignin = () => {
    this.props.history.push("/");
  };
  signUp = () => {
    axios
      .post("/addUser", {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        console.log(response);
        this.props.history.push("/");
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <div className="grid-2">
        <section className="flex-col">
          <main className="flex-col">
            <div className="login-container flex">
              <h3>Sign Up Please</h3>
              <p>Talk to Anyone Anytime Anywhere...</p>
            </div>
            <form>
              <div className="form">
                <div className="input">
                  <label for="Firstname">First Name</label>
                  <input
                    onInput={this.changeWord}
                    type="text"
                    name="firstName"
                    id="Firstname"
                    placeholder="First Name"
                  />
                </div>
                <div className="input">
                  <label for="lastname">Last Name</label>
                  <input
                    onInput={this.changeWord}
                    type="text"
                    name="lastName"
                    id="lastname"
                    placeholder="last name"
                  />
                </div>
              </div>
              <div>
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
              </div>
              <button
                className="button"
                type="button"
                color="primary"
                onClick={this.signUp}
              >
                SUBMIT
              </button>
            </form>
          </main>
          <div>
            <span>Already had an account ,</span>
            <span className="goto" onClick={this.gotoSignin}>
              Sign In here
            </span>
          </div>
        </section>
        <div className="image flex">
          <img src={work} alt="" />
        </div>
      </div>
    );
  }
}

export default Signup;
