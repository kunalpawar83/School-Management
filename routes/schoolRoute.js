const express  = require('express');
const router  = express.Router();
const schoolCont = require('../controller/schoolCont');


router.post('/addschool', schoolCont.addSchoolHandler);



module.exports = router