const express  = require('express');
const router  = express.Router();
const schoolCont = require('../controller/schoolCont');


router.post('/addschool', schoolCont.addSchoolHandler);
router.get('/getallschools', schoolCont.listSchoolsHandler);


module.exports = router