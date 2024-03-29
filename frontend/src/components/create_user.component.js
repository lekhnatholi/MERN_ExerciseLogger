import React, { Component } from "react";
import axios from "axios";

export default class create_user extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.state.username,
    };
    console.log(user);
    axios
      .post("http://localhost:8000/users/add", user)
      .then((res) => console.log(res.data));
    this.setState({
      username: "",
    });
    window.location.href = "http://localhost:3000";
  }
  render() {
    return (
      <div className="container">
        <div className="row ">
          <div className="col-md-6 col-sm-6">
            <h3>Create New User</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Create User"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
