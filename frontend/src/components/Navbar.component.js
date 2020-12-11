import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand mr-auto">ExerciseTracker</Link>
                <ul className=" nav navbar-nav">
                    <li className="navbar-item">
                        <Link to="/create" className="nav-link">Create ExerciseLog</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/user" className="nav-link">Create User</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}
