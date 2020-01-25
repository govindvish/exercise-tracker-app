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
            <div className="create-user">
                <h3 className="mb-4 text-center">Create New User</h3>
                <div className="col offset-md-3 offset-lg-3 col-md-6 col-lg-6 p-5 create-user-form">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Username: </label>
                            <input type="text"
                                required
                                className="form-control"
                                name="username"
                                placeholder="enter user"
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group text-center mt-5">
                            <input className="btn btn-outline-light btn-lg" type="submit" value="Create User" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateUser;