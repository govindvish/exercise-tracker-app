import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function EditExercise(props) {
    console.log(props.location);
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
            url: 'http://localhost:5000/exercises/update/' + props.match.params.id,
            data: exercise_data
        })
            .then((res) => {
                console.log(res.data);
                // getExercise();
            })
            .catch((err) => {
                console.log(err);
            });
        // getExercise();
        history.push('/');

    }

    const getUsers = () => {
        console.log('get users initiated...');
        axios({
            method: 'GET',
            url: 'http://localhost:5000/users',
        })
            .then((res) => {
                console.log(res.data);
                if (res.data.length > 0) {
                    setUsers(res.data.map(user => user.username));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const getExercise = () => {
        console.log('getExercise initiated...');
        axios({
            method: 'GET',
            url: 'http://localhost:5000/exercises/' + props.match.params.id,
        })
            .then(res => {
                exercise.username = res.data.username;
                exercise.description = res.data.description;
                exercise.duration = res.data.duration;
                setDate(new Date(res.data.date));
            })
    }

    useEffect(() => {
        let mounted = true;
        // setUsers(['test', 'test1', 'test2']);
        // exercise.username = 'test';
        if (mounted) {
            getUsers();
            getExercise();
        }

        return () => {
            mounted = false;
        }
    }, []);
    return (
        <div>
            <h3>Edit Exercise Logs</h3>
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

                <div className="form-group">
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default EditExercise;