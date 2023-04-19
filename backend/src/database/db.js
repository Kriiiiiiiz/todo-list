const mongoose = require('mongoose');


exports.connect = function connect(){
    mongoose.connect(process.env.DB,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    
    .then(() => console.log('Conexión a base de datos establecida !'))
    .catch(err => console.log(err));

    const userSchema = new mongoose.Schema({
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    })

    mongoose.model('user', userSchema)

};