const express = require('express');
const {register,login} = require('../controllers/auth.controller')
const router = express.Router();
const {protect,adminProtect} = require('../Middlewares/authMiddleware')

router.post('/register',register)
router.post('/login',login)


module.exports = router;