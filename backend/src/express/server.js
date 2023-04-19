const bodyparser = require('body-parser');
const express = require('express');
const routerApi = require('../routers/api.js');
const path = require('path');
const session = require('express-session');
const controller = require('../controller/controllers.js')

exports.launch = () => {
    const app = express();

    app.use(bodyparser.urlencoded({
        extended: true
    }))

    app.use(session({
        secret: 'wEGFWAgawerg34t234',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false}
    }))

    app.use(bodyparser.json())
    
    app.use(express.static(path.join(__dirname,'../../../frontend/build')));
    
    app.use('/api', routerApi)

    app.listen(process.env.PORT,() => console.log(`Express: ${process.env.PORT}`))

    app.get('/', (req, res) => {
        res.status(200)
        .sendFile(path.join(__dirname,'../../../frontend/build/index.html'));
    })

    app.post('/login', controller.login)
    app.post('/register', controller.register)
}