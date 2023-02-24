require('dotenv').config({ path: 'config.env' });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookie = require('cookie-parser');

const route = require('./Route/Route');
const AppError = require('./ErrorHandler/AppError');
const { globalErrorHandler } = require('./ErrorHandler/globalErrorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookie());

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGODB)
  .then((res) => {
    console.log('Connection to MongoDb success!');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(route);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`The ${req.originalUrl} not found in the server!`, 400)
  );
});

app.use(globalErrorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
