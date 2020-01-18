import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Exercises() {
    const [exercises, setExercises] = useState([]);
    const getExercises = () => {
        console.log('reload getExercises....');
        axios({
            method: 'GET',
            url: 'http://localhost:5000/exercises/'
        })
            .then((res) => {
                console.log(res.data);
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
            url: 'http://localhost:5000/exercises/' + id,
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
    }, []);
    return (
        <div>
            <h3>Exercises Log</h3>
            <table className="table">
                <thead className="thead-light">
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
                                        <Link to={{ pathname: '/edit/' + el._id, editData: { username: el.username, description: el.description, duration: el.duration, date: el.date, } }}>Edit</Link> | <Link to={'/'} onClick={() => deleteExercise(el._id)}>Delete</Link>
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