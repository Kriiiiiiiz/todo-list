const dotenv = require('dotenv').config();
const mongoose = require('mongoose');


exports.connect = function connect(){
    mongoose.connect(process.env.DB,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    
    .then(() => console.log('Conexión a base de datos establecida !'))
    .catch(err => console.log(err));

    const userSchema = new mongoose.Schema({
        username: { type: string, required: true, unique: true },
        password: { type: strung, required: true }
    })

    mongoose.model('user', userSchema)

};