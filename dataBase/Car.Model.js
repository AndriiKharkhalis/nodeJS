const { Schema, model } = require('mongoose');
const carTypesEnum = require('../constants/car-types.enum');

const carTypeEnum = require('../constants/car-types.enum');

const Car = new Schema(
    {
        name: { type: String, trim: true, require: true },
        engine: { type: String, trim: true, },
        year: { type: Number, default: 2010 },
        type: { type: String, enum: Object.values(carTypeEnum), default: carTypesEnum.SEDAN }
    }, { timestamps: true }
);

module.exports = model('Car', Car);