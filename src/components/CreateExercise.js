import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class CreateExercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: [],
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleDateChange = (date) => {
        this.setState({
            date: date
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
        };

        console.log(exercise);
        axios.post('http://localhost:5000/exercises/add', exercise)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })

        window.location = '/';
    }

    getUsers = () => {
        axios.get('http://localhost:5000/users/')
            .then((res) => {
                if (res.data.length > 0) {
                    this.setState({
                        users: res.data.map((user) => user.username),
                        username: res.data[0].username
                    })
                }
            })
            .catch((err) => { console.log(err); });
    }

    componentDidMount() {
        this.getUsers();
    }

    render() {
        return (
            <div className="create-exercise">
                <h3 className="mb-4 text-center">Create New Exercise Logs</h3>
                <div className="col offset-md-3 offset-lg-3 col-md-6 col-lg-6 p-5 create-exercise-form">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Username: </label>
                            <select
                                required
                                className="form-control"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleChange}>
                                {
                                    this.state.users.map(user => {
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
                                placeholder="Exercise description"
                                value={this.state.description}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Duration (in minutes): </label>
                            <input
                                type="text"
                                className="form-control"
                                name="duration"
                                value={this.state.duration}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Date: </label>
                            <div>
                                <DatePicker
                                    selected={this.state.date}
                                    name="date"
                                    onChange={this.handleDateChange}
                                />
                            </div>
                        </div>

                        <div className="form-group text-center mt-5">
                            <input type="submit" value="Create Exercise Log" className="btn btn-outline-light btn-lg" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateExercise;