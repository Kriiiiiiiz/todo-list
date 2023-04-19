const mongoose = require('mongoose');

const Users = mongoose.model('users',

    new mongoose.Schema({
        username: { type: String, unique: true, required: true },
        password: { type: String, required: true },
    })
)

const Tasks = mongoose.model('tasks',

    new mongoose.Schema({
        taskName: String,
        taskDesc: String,
        status: String,
        owner: String,
        id: { type: String, unique: true },
    })
)

exports.Users = Users;
exports.Tasks = Tasks;