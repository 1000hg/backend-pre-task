const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require("./models");
const cors = require('cors');


const routes = require('./routes');


//db.sequelize.sync();

app.use(cors()); 
app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(bodyParser.json());
app.use('/', routes);

module.exports = app;
