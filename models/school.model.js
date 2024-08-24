const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db.js');

const School = sequelize.define('School', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "The school name is required."
            },
            notEmpty: {
                msg: "The school name cannot be empty."
            }
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "The address is required."
            },
            notEmpty: {
                msg: "The address cannot be empty."
            }
        }
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notNull: {
                msg: "The latitude is required."
            },
            isFloat: {
                msg: "The latitude must be a valid number."
            }
        }
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notNull: {
                msg: "The longitude is required."
            },
            isFloat: {
                msg: "The longitude must be a valid number."
            }
        }
    }
}, {
    tableName: 'schools',
    timestamps: false
});

module.exports = School;
