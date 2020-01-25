import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: 'exercises',
        }
    }

    setActiveClass = (e) => {
        this.setState({
            isActive: e.target.id,
        })
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark">
                <Link to="/" className="navbar-brand">ExerTrack</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link id="exercises" to="/" className={this.state.isActive === "exercises" ? "nav-link active" : "nav-link"} onClick={this.setActiveClass}>Exercises</Link>
                        </li>
                        <li className="nav-item">
                            <Link id="create-exercise" to="/create" className={this.state.isActive === "create-exercise" ? "nav-link active" : "nav-link"} onClick={this.setActiveClass}>Create Exercise Log</Link>
                        </li>
                        <li className="nav-item">
                            <Link id="create-user" to="/user" className={this.state.isActive === "create-user" ? "nav-link active" : "nav-link"} onClick={this.setActiveClass}>Create User</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
export default Navbar;