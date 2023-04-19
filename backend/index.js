const db = require('./src/database/db.js');
const expressMain = require('./src/express/main.js');

db.connect();
expressMain.launch();