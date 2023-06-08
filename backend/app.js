const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require("./models");

const routes = require('./routes');


//db.sequelize.sync();

app.use(bodyParser.json());
app.use('/', routes);

module.exports = app;
