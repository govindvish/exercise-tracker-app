import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Exercises from './components/Exercises';
import EditExercise from './components/EditExercise';
import CreateExercise from './components/CreateExercise';
import CreateUser from './components/CreateUser';
import './assets/css/main.css';

function App() {
    return (
        <div className="App">
            <Navbar />
            <div className="container py-5">
                <Route exact path='/' component={Exercises} />
                <Route exact path='/edit/:id' component={EditExercise} />
                <Route exact path='/create' component={CreateExercise} />
                <Route exact path='/user' component={CreateUser} />
            </div>
        </div>
    );
}

export default App;
