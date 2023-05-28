const { Schema, model } = require('mongoose');
const { carTypesEnum } = require('../constants');

const Car = new Schema(
    {
        name: { type: String, trim: true, require: true },
        engine: { type: String, trim: true, },
        year: { type: Number, default: 2010 },
        type: { type: String, enum: Object.values(carTypesEnum), default: carTypesEnum.SEDAN }
    }, { timestamps: true }
);

module.exports = model('Car', Car);