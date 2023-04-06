const User = require('../dataBase/User.model');
const ApiError = require('../error/ApiError');

const checkIsEmailDuplicate = async (req, res, next) => {
    try {
        const { mail = '' } = req.body;

        if (!mail) {
            next(new ApiError('Email is required', 400));
            return;
        }

        const isUserPresent = await User.findOne({ mail: mail.toLowerCase().trim() });

        if (isUserPresent) {
            next(new ApiError('User with this mail exists', 409));
            return;
        }

        next();
    } catch (e) {
        next(e);
    }
};

const checkIsIdValid = (req, res, next) => {
    try {
        const { userIndex } = req.params;

        if (userIndex.length != 24) {
            next(new ApiError('Id is not valid', 400));
            return;
        }

        next();
    } catch (e) {
        next(e);
    }
};

const checkUserAge = (req, res, next) => {
    try {
        const { age } = req.body;

        if (age <= 0) {
            next(new ApiError('Age is not valid', 400));
            return;
        }

        next();
    } catch (e) {
        next(e);
    }
};


module.exports = {
    checkIsEmailDuplicate,
    checkIsIdValid,
    checkUserAge
}