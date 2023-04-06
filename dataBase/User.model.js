// const { timeStamp } = require('console'); // ???само зявилось

const { Schema, model } = require('mongoose');

const userRolesEnum = require('../constants/user-roles.enum');

const User = new Schema(
    {
        name: { type: String, trim: true, required: true },
        mail: { type: String, trim: true, lowercase: true, unique: true, required: true }, // required - означає, що БД не буде приймати юзера
        age: { type: Number, default: 18 },
        role: { type: String, enum: Object.values(userRolesEnum), default: userRolesEnum.USER }
    },
    { timestamps: true } // будуть поля created at i update at в DB
);

module.exports = model('User', User); // 'User' - назва моделі, User - схема, на основі якої будуємо модель