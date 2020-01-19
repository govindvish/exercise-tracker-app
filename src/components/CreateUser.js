import React, { Component } from 'react';
import axios from 'axios';

class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            username: this.state.username,
        };

        console.log(user);
        axios({
            method: 'POST',
            url: 'http://localhost:5000/users/add',
            data: user
        })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        this.setState({
            username: ''
        });
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input className="btn btn-primary" type="submit" value="Create User" />
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateUser;