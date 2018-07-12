const ApiError = require('../domain/ApiError');
const config = require('../config/config');

// Authentication function
function auth(req, res, next) {

    // Get input service key
    const input_service_key = config.iftttServiceKey;

    // Get this service's service key
    const service_key = req.header('IFTTT-Service-Key');

    // Check key and return if not valid
    if (service_key !== input_service_key) {
        const keyError = new ApiError('Invalid channel key', 401);
        return res.status(401).send(keyError);
    }

    // Next if key is valid
    next();
}

// Export the authentication function
module.exports = auth;