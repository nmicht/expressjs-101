require('dotenv').config();

const express = require('express');

const bodyParser = require('body-parser');

const router = require('./routes');

const { errorHandler } = require('./middlewares');

const app = express();

// Cargamos los middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Load routes into app
app.use(router);

// Handle error responses
app.use(errorHandler);

app.listen(process.env.PORT, () => console.log(`ExpressJS-101 app listening on port ${process.env.PORT}!`));
