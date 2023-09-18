const express = require('express')
const mainRouter = require('./main/mainRouter')
const userRouter = require('./users/usersRouter')

const app = express();
app.use(express.json());

app.use('/user', userRouter);
app.use('/', mainRouter);

module.exports = {app};