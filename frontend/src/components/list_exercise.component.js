import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class list_exercise extends Component {
  constructor(props) {
    super(props);
    this.deleteExercise = this.deleteExercise.bind(this);
    this.state = { exercises: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:8000/exercise")
      .then((response) => {
        console.log(response);
        this.setState({ exercises: response.data });
      })
      .catch((error) => console.log(error));
  }
  deleteExercise(id) {
    axios
      .delete("http://localhost:8000/exercise/" + id)
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
    this.setState({
      exercise: this.state.exercises.filter((el) => el.id !== id),
    });
    window.location.href = "http://localhost:3000";
  }
  render() {
    return (
      <div className="container">
        <div className="d-flex m-2 ">
          <h3 className="mr-auto">Logged Exercises</h3>
        </div>

        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exerciseLIst()}</tbody>
        </table>
      </div>
    );
  }
  exerciseLIst() {
    return this.state.exercises.map((CurrentExercise) => {
      return (
        <Exercise
          exercise={CurrentExercise}
          key={CurrentExercise._id}
          deleteExercise={this.deleteExercise}
        />
      );
    });
  }
}
const Exercise = (props) => {
  return (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date}</td>
      <td>
        <button className="btn btn-sm btn-info mr-2 ">
          <Link to={"/edit/" + props.exercise._id} style={{ color: "white" }}>
            {" "}
            Edit{" "}
          </Link>
        </button>
        <button
          className="btn btn-sm btn-danger"
          href="/"
          onClick={() => props.deleteExercise(props.exercise._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
