import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class edit_exercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            description: '',
            duration: '',
            date: new Date(),
            users: []
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangeUsername(e) {
        this.setState({ username: e.target.value })
    }
    onChangeDescription(e) {
        this.setState({ description: e.target.value })
    }
    onChangeDuration(e) {
        this.setState({ duration: e.target.value })
    }
    onChangeDate(date) {
        this.setState({
            date: date
        })
    }
    onSubmit(e) {
        e.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        console.log(exercise);
        axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
            .then(res => console.log(res.data));
        window.location.href = "http://localhost:3000";
    }
    componentDidMount() {
        console.log(this.props.match.params.id);
        axios.get('http://localhost:5000/exercise/' + this.props.match.params.id)
            .then(response => {
                console.log(response);
                this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: response.data.date
                })
            })
            .catch((error) => {
                console.log(console.log(error));
            })
        axios.get('http://localhost:5000/users')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user =>
                            user.username
                        )
                    })
                }
            }).catch(err => console.log(err));
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-10">
                        <h3 className="m-10"> Edit Exercise Log</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Username:</label>
                                <select ref="userInput" required className="form-control"
                                    value={this.state.username} onChange={this.onChangeUsername}>
                                    {this.state.users.map(user => {
                                        return <option key={user} value={user}>{user}</option>
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <input type="text" className="form-control" value={this.state.description}
                                    onChange={this.onChangeDescription} />
                            </div>
                            <div className="form-group">
                                <label>Duration</label>
                                <input type="text" className="form-control" value={this.state.duration}
                                    onChange={this.onChangeDuration} />
                            </div>
                            <div className="form-group">
                                <label>Date:</label>
                                <div>
                                    <DatePicker selected={this.state.Date} onChange={this.onChangeDate} />
                                </div>
                            </div>
                            <div className="form-group">
                                <input type="submit" value="Edit Exercise Log " className="btn btn-primary" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
