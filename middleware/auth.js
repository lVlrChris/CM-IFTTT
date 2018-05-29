// Authentication function
function auth(req, res, next) {

    // Get input service key
    const input_service_key = process.env.IFTTT_SERVICE_KEY;

    // Get this service's service key
    const service_key = req.header('IFTTT-Service-Key');

    // Check key and return if not valid
    if (service_key !== input_service_key) return res.status(401).send('Invalid key');

    // Next if key is valid
    next();

}

// Export the authentication function
module.exports = auth;