const express = require('express');

const routes = require('./routes');

const app = express();

app.set('view engine', 'pug');

app.use(routes);




// Define a port and start listening for connections.

module.exports = app;

