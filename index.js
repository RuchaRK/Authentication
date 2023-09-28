const express = require('express');
const app = express();
require('./db')

const users = require("./routes/users.router");
const auth = require("./routes/auth.router");

const errorHandle = require("./middlewares/errorHandler.middleware");
const routeNotFound = require("./middlewares/routeNotFound.middleware");

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.use('/auth', auth);
app.use('/movies', movies);
app.use('/user-details', authVerify, users);

app.use(routeNotFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});