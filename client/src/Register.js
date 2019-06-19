import React from "react";
import axiosInstance from "./helper/instance";

class Register extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleSubmit = async event => {
    event.preventDefault();
    try {
      const { username, password } = this.state;
      const result = await axiosInstance.post("/register", {
        username,
        password
      });
      this.setState({ username: "", password: "" });
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <>
        <h3>Register</h3>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
            value={this.state.password}
          />

          <button type="submit">Register</button>
        </form>
      </>
    );
  }
}

export default Register;
