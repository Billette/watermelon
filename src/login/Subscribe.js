import React, { Component } from "react";
import request from "../database/Request";

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
        <h1>Subscribe</h1>
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
          <label htmlFor="firstName">First name:</label>
          <input
            required
            name="firstName"
            onChange={e => this.setState({ firstName: e.target.value })}
          />
          <label htmlFor="lastName">Last name:</label>
          <input
            required
            name="lastName"
            onChange={e => this.setState({ lastName: e.target.value })}
          />
          <label htmlFor="email">Email:</label>
          <input
            required
            type="email"
            name="email"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <label htmlFor="password">Password:</label>
          <input
            required
            type="password"
            name="password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Subscribe</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>
          Already got an account?
          <button onClick={() => navigate("login")}>Login instead</button>
        </p>
      </div>
    );
  }
}

export default Subscribe;
