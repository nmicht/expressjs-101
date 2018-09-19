require('dotenv').config();

const express = require('express');

const router = require('./routes');

const app = express();

// Load routes into app
app.use(router);

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
