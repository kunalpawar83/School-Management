const School = require('../models/school.model.js');
const NodeGeocoder = require('node-geocoder');

const geocoder = NodeGeocoder({
    provider: 'openstreetmap' 
});


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

exports.listSchoolsHandler =async (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ message: 'Latitude and Longitude are required.' });
    }

    try {
        const schools = await School.findAll();
        const userLocation = { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };

        const schoolsWithDistance = await Promise.all(schools.map(async (school) => {
            const distance = await geocoder.distance({
                latitude: school.latitude,
                longitude: school.longitude
            }, userLocation);
            return {
                ...school.toJSON(),
                distance: distance[0].distance
            };
        }));

        const sortedSchools = schoolsWithDistance.sort((a, b) => a.distance - b.distance);
        res.status(200).json(sortedSchools);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching schools', error: error.message });
    }
};