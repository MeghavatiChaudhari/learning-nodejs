const express = require('express');
const {handlegenerateshorturl} = require('../controllers/url');
const router = express.Router();

router.post('/',handlegenerateshorturl);

module.exports=router;