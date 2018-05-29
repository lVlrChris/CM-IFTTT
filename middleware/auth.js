// Authentication function
function auth(req, res, next) {

    const input_service_key = process.env.IFTTT_SERVICE_KEY;

    const service_key = req.header('IFTTT-Service-Key');

    if (service_key !== input_service_key) return res.status(401).send('Invalid key');

    next();

}

// Export the authentication function
module.exports = auth;