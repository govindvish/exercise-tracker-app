import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">ExerTrack</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link activeclassname="active" to="/" className="nav-link">Exercises</Link>
                    </li>
                    <li className="nav-item">
                        <Link activeclassname="active" to="/create" className="nav-link">Create Exercise Log</Link>
                    </li>
                    <li className="nav-item">
                        <Link activeclassname="active" to="/user" className="nav-link">Create User</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;