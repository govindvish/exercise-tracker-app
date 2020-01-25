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
        <div>
            <h3>Create New User</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text"
                        required
                        className="form-control"
                        name="username"
                        value={username}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input className="btn btn-primary" type="submit" value="Create User" />
                </div>
            </form>
        </div>
    )
}

export default CreateUser;