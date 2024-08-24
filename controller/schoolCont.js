const School = require('../models/school.model.js');


const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

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

exports.listSchoolsHandler = async (req, res) => {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
        return res.status(400).json({ message: 'Latitude and Longitude are required.' });
    }
    try {
        const schools = await School.findAll();
        const sortedSchools = schools.map(school => {
            const distance = calculateDistance(latitude, longitude, school.latitude, school.longitude);
            return { ...school.dataValues, distance };
        }).sort((a, b) => a.distance - b.distance);
        if(sortedSchools.length === 0){
            return res.status(404).json({ 
                message: 'No schools found.',
            });
        }
        res.status(200).json(sortedSchools);
    } catch (err) {
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
};

exports.deleteSchoolHandler = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'School ID is required.' });
    }
    try {
        if(await School.count({ where: { id } }) === 0) {
            return res.status(404).json({ message: 'School not found.' });
        }
        await School.destroy({ where: { id } });
        res.status(200).json({ message: 'School deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Database error.', error: err.message });
    }
};