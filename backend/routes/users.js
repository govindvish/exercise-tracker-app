const router = require('express').Router();
const User = require('../models/user.model');

// Get all users
router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get an user by id
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add a user
router.post('/add', (req, res) => {
    const username = req.body.username;
    // create a new instance of user using the username.
    const newUser = new User({ username });

    // the newUser is saved to the DB with save() method.
    newUser.save()
        .then(() => res.json('User added!...'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete an user by id
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted!...'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;