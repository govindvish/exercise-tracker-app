import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Exercises extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exercises: []
        }
    }

    deleteExercise = (id) => {
        axios.delete('http://localhost:5000/exercises/' + id)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    exercises: this.state.exercises.filter((el) => el._id !== id)
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    getExercises = () => {
        axios.get('http://localhost:5000/exercises/')
            .then((res) => {
                this.setState({
                    exercises: res.data
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    componentDidMount() {
        this.getExercises();
    }

    render() {
        if (this.state.exercises.length !== 0) {
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
                                this.state.exercises.map(el => {
                                    return (
                                        <tr key={el._id}>
                                            <td>{el.username}</td>
                                            <td>{el.description}</td>
                                            <td>{el.duration}</td>
                                            <td>{el.date.substring(0, 10)}</td>
                                            <td>
                                                <Link to={'/edit/' + el._id}>Edit</Link> | <Link to={'/'} onClick={() => this.deleteExercise(el._id)}>Delete</Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            );
        }
        else {
            return (
                <div>
                    <h3>No Exercises Logged!...</h3>
                </div>
            );
        }
    }
}

export default Exercises;