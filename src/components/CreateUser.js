import React, { useState } from 'react';
import axios from 'axios';

function CreateUser() {
    const [username, setUsername] = useState('');

    const handleChange = (e) => {
        setUsername(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            username: username
        };

        console.log(user);
        axios({
            method: 'POST',
            url: process.env.REACT_APP_API_URL + '/users/add',
            data: user
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });

        setUsername('');

    }

    return (
        <div className="create-user">
            <h3 className="mb-4 text-center">Create New User</h3>
            <div className="col offset-md-3 offset-lg-3 col-md-6 col-lg-6 p-5 create-user-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group text-center mt-5">
                        <input className="btn btn-outline-light btn-lg" type="submit" value="Create User" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateUser;