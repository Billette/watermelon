import React, { Component } from "react";
import request from "../database/Request";

class Login extends Component {
  state = {
    email: null,
    password: null,
    error: null
  };

  // TODO: handle this on server side
  login = () => {
    const { email, password } = this.state;
    // Get first matched user
    const users = request.getUsers();
    const user = users.find(u => u.email === email);
    if (!user) {
      return this.setState({
        error: "No user matched"
      });
    }
    if (user.password !== password) {
      return this.setState({
        error: "Incorrect password"
      });
    }

    // Log user
    this.props.onConnection(user.id);
  };

  render() {
    const { navigate } = this.props;
    const { error } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <br />
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <label for="email">Email:</label>
          <input
            name="email"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <label for="password">Password:</label>
          <input
            name="password"
            onChange={e => this.setState({ password: e.target.value })}
          />
        </form>
        <button onClick={this.login}>Send</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>
          New?{" "}
          <button onClick={() => navigate("subscribe")}>
            Create an account
          </button>
        </p>
      </div>
    );
  }
}

export default Login;
