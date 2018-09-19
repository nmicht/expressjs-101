require('dotenv').config();

const express = require('express');

const app = express();

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
