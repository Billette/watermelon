import React, { Component } from "react";
import request from "../database/Request";
import Header from "../Component/Header";

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
        <Header />
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
          <label for="email" style={{ marginBottom: 10 }}>
            Email:
          </label>
          <input
            name="email"
            placeholder="Enter your Email"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <label for="password" style={{ marginTop: 10, marginBottom: 10 }}>
            Password:
          </label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={e => this.setState({ password: e.target.value })}
          />
        </form>
        <button
          onClick={this.login}
          style={{ marginTop: 10, borderRadius: "15px" }}
        >
          Send
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>
          New?{" "}
          <button
            onClick={() => navigate("subscribe")}
            style={{ marginLeft: 10, borderRadius: "15px" }}
          >
            Create an account
          </button>
        </p>
      </div>
    );
  }
}

export default Login;
