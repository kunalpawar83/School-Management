const express  = require('express');
const router  = express.Router();
const schoolCont = require('../controller/schoolCont');


router.post('/addSchool', schoolCont.addSchoolHandler);
router.get('/listSchools', schoolCont.listSchoolsHandler);
router.delete('/deleteSchool/:id', schoolCont.deleteSchoolHandler);


module.exports = router