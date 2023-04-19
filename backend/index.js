require('dotenv').config();
const db = require('./src/database/db.js');
const expressMain = require('./src/express/server.js');


db.connect();
expressMain.launch();