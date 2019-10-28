import React, { Component } from "react";
import request from "../database/Request";
import Header from "../Component/Header";

class Subscribe extends Component {
  state = {
    error: null,
    firstName: null,
    lastName: null,
    email: null,
    password: null
  };

  // TODO: handle this on server side
  subscribe = () => {
    const { email, firstName, lastName, password } = this.state;
    // Get first matched user
    const users = request.getUsers();
    const user = users && users.find(u => u.email === email);
    if (user) {
      return this.setState({
        error: "User already exists"
      });
    }

    // Set up a user id
    const idUser = request.IDAutoIncrement(users);
    // Save in db
    request.addUser({
      id: idUser,
      firstName,
      lastName,
      email,
      password,
      isAdmin: false
    });
    // On success
    this.props.onConnection(idUser);
  };

  render() {
    const { navigate } = this.props;
    const { error } = this.state;

    return (
      <div>
        <Header />
        <h1>Subscribe To Watermelon</h1>
        <br />
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
          onSubmit={e => {
            e.preventDefault();
            if (e.target.checkValidity()) {
              this.subscribe();
            }
          }}
        >
          <label for="firstName" style={{ marginBottom: 10 }}>
            First name:
          </label>
          <input
            required
            name="firstName"
            placeholder="Enter your first name"
            onChange={e => this.setState({ firstName: e.target.value })}
          />

          <label for="lastName" style={{ marginTop: 10, marginBottom: 10 }}>
            Last name:
          </label>
          <input
            required
            name="lastName"
            placeholder="Enter your last name"
            onChange={e => this.setState({ lastName: e.target.value })}
          />
          <label for="email" style={{ marginTop: 10, marginBottom: 10 }}>
            Email:
          </label>
          <input
            required
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <label for="password" style={{ marginTop: 10, marginBottom: 10 }}>
            Password:
          </label>
          <input
            required
            type="password"
            name="password"
            placeholder="Enter a password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button
            type="submit"
            style={{ marginTop: 10, marginBottom: 10, borderRadius: "15px" }}
          >
            Subscribe
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>
          Already got an account?
          <button
            onClick={() => navigate("login")}
            style={{ marginLeft: 10, borderRadius: "15px" }}
          >
            Login instead
          </button>
        </p>
      </div>
    );
  }
}

export default Subscribe;
