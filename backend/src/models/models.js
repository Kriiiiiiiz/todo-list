const mongoose = require('mongoose');

const Users = mongoose.model('users',

    new mongoose.Schema({
        username: String,
        password: String,
    })
)

const Tasks = mongoose.model('tasks',

    new mongoose.Schema({
        taskName: String,
        taskDesc: String,
        id: { type: String, unique: true },
        status: String,
    })
)