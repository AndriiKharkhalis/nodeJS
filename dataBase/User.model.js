const { timeStamp } = require('console'); // appeared by itself

const { Schema, model } = require('mongoose');

const userRolesEnum = require('../constants/user-roles.enum');

const User = new Schema(
    {
        name: { type: String, trim: true, required: true },
        mail: { type: String, trim: true, lowercase: true, unique: true, required: true }, // required - means must be
        age: { type: Number, default: 18 },
        role: { type: String, enum: Object.values(userRolesEnum), default: userRolesEnum.USER }
    },
    { timestamps: true } // created at & update at in DB
);

module.exports = model('User', User); // 'User' - the name of the model, User - the scheme on the basis of which we build the model