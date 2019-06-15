import React from "react";
import axiosInstance from "./helper/instance";
import { withRouter } from "react-router-dom";

class Jokes extends React.Component {
  state = {
    jokes: []
  };
  async componentDidMount() {
    try {
      const result = await axiosInstance.get("/jokes");
      this.setState({ jokes: result.data });
      console.log(result);
    } catch (err) {
      console.error(err);
      if (err.response.status === 401 || err.response.status === 403) {
        this.props.history.push("/login");
      } else {
        console.error(err);
      }
    }
  }
  render() {
    return (
      <>
        <h3>Jokes</h3>
        <ul>
          {this.state.jokes.map((joke, i) => {
            return <li key={i}>{joke.joke}</li>;
          })}
        </ul>
      </>
    );
  }
}

export default withRouter(Jokes);
