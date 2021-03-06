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
        axios.delete(process.env.REACT_APP_API_URL + '/exercises/' + id)
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
        axios.get(process.env.REACT_APP_API_URL + '/exercises/')
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
                                this.state.exercises.map(el => {
                                    return (
                                        <tr key={el._id}>
                                            <td>{el.username}</td>
                                            <td>{el.description}</td>
                                            <td>{el.duration}</td>
                                            <td>{el.date.substring(0, 10)}</td>
                                            <td>
                                                <Link to={'/edit/' + el._id}><i className="fa fa-pencil text-info" aria-hidden="true"></i></Link> | <Link to={'/'} onClick={() => this.deleteExercise(el._id)}><i className="fa fa-trash text-danger" aria-hidden="true"></i></Link>
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