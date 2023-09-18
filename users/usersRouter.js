const express = require('express')
const {singupHandler,loginHandler}=require('./usersController.js');

const router = express.Router()

router.post('/login',loginHandler);
router.post('/signup', singupHandler);

module.exports = router