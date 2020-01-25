import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CreateExercise() {
    const history = useHistory();
    const [exercise, setExercise] = useState({
        username: '',
        description: '',
        duration: 0,
        // date: new Date()
    });
    const [users, setUsers] = useState([]);
    const [date, setDate] = useState(new Date());

    const handleChange = (e) => {
        e.persist();
        setExercise((previousValue) => ({
            ...previousValue,
            [e.target.name]: e.target.value
        }));
    }

    const handleDate = (date) => {
        setDate(date);
    }

    const handleSubmit = (e) => {
        console.log('add exercise initiated...');
        e.preventDefault();

        const exercise_data = {
            username: exercise.username,
            description: exercise.description,
            duration: exercise.duration,
            date: date,
        };

        axios({
            method: 'POST',
            url: process.env.REACT_APP_API_URL + '/exercises/add',
            data: exercise_data
        })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        history.push('/');

    }

    const getUsers = () => {
        console.log('get users initiated...');
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URL + '/users',
        })
            .then((res) => {
                console.log(res.data);
                if (res.data.length > 0) {
                    setUsers(res.data.map(user => user.username));
                    exercise.username = res.data[0].username;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        let mounted = true;
        // setUsers(['test', 'test1', 'test2']);
        // exercise.username = 'test';
        if (mounted) {
            getUsers();
        }

        return () => {
            mounted = false;
        }
    }, []);
    return (
        <div className="create-exercise">
            <h3 className="mb-4 text-center">Create New Exercise Logs</h3>
            <div className="col offset-md-3 offset-lg-3 col-md-6 col-lg-6 p-5 create-exercise-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select
                            required
                            className="form-control"
                            name="username"
                            value={exercise.username}
                            onChange={handleChange}>
                            {
                                users.map(user => {
                                    return <option key={user} value={user} >{user}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            placeholder="Exercise description"
                            name="description"
                            value={exercise.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input
                            type="text"
                            className="form-control"
                            name="duration"
                            value={exercise.duration}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={date}
                                name="date"
                                onChange={handleDate}
                            />
                        </div>
                    </div>

                    <div className="form-group text-center mt-5">
                        <input type="submit" value="Create Exercise Log" className="btn btn-outline-light btn-lg" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateExercise;