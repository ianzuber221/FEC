/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const compression = require('compression');
require('dotenv').config();

const app = express();
app.use(compression());

app.use(express.static(path.join(__dirname, '../client/public'), {
  setHeaders: function (res, path, stat) {
    res.set('Cache-Control', 'max-age=31536000')
  }
}));

// app.use(express.static(path.join(__dirname, '../client/public')));

app.listen(process.env.PORT || 8080, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
