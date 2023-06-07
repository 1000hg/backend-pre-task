const express = require('express');
const app = express();
const db = require("./models");

const routes = require('./routes');


db.sequelize.sync();

app.use('/', routes);

module.exports = app;
