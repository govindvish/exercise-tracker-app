import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Exercises() {
    const [exercises, setExercises] = useState([]);
    const getExercises = () => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URL + '/exercises/'
        })
            .then((res) => {
                setExercises(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const deleteExercise = (id) => {
        console.log('delete initiated...');
        axios({
            method: 'DELETE',
            url: process.env.REACT_APP_API_URL + '/exercises/' + id,
        })
            .then((res) => {
                console.log(res.data);
                setExercises(exercises.filter(el => el._id !== id));
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        let mounted = true;
        // setUsers(['test', 'test1', 'test2']);
        // exercise.username = 'test';
        if (mounted) {
            getExercises();
        }


        return () => {
            mounted = false;
        }
    }, [exercises]);

    return (
        <div className="exercise-log">
            <h3 className="mb-4 text-center">Exercises Log</h3>
            <table className="table table-responsive-sm table-striped">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        exercises.map(el => {
                            return (
                                <tr key={el._id}>
                                    <td>{el.username}</td>
                                    <td>{el.description}</td>
                                    <td>{el.duration}</td>
                                    <td>{el.date.substring(0, 10)}</td>
                                    <td>
                                        <Link to={{ pathname: '/edit/' + el._id, editData: { username: el.username, description: el.description, duration: el.duration, date: el.date, } }}><i className="fa fa-pencil text-info" aria-hidden="true"></i></Link> | <Link to={'/'} onClick={() => deleteExercise(el._id)}><i className="fa fa-trash text-danger" aria-hidden="true"></i></Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div >
    )
}

export default Exercises;