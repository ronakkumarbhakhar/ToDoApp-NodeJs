const express = require('express');
var cors = require('cors')
const path=require('path');
const mainRouter = require('./main/mainRouter');
const userRouter = require('./users/usersRouter');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/user', userRouter);
app.use('/', mainRouter);
module.exports = {app};