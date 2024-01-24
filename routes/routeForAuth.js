const express = require('express');
const {handleAuthentication}=require('../controllers/controForAuth');
const router = express.Router();
router.post('/',handleAuthentication)

module.exports=router;