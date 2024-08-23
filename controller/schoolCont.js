const School = require('../models/school.model.js');




exports.addSchoolHandler = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;
    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    try {
       const data  =  await School.create({ name, address, latitude, longitude });
        res.status(201).json({ 
            message: 'School added successfully.',
            data
        });
    } catch (err) {
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
};

