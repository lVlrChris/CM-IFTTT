const {Pool} = require('pg');
const config = require('../config/config');

//Create pool for database connections
const pool = new Pool({
    connectionString: config.dbHostAddr,
    ssl: true
});

module.exports = {

    //Centralized query function with logging
    query(text, params, callback) {
        const start = Date.now();
        return pool.query(text, params, (err, res) => {
            const duration = Date.now() - start;
            console.log('Executed query', {text, duration, rows: res.rowCount});
            callback(err, res);
        });
    },

    //Client function used for multiple queries
    getClient(callback) {
        pool.connect((err, client, done) => {
            callback(err, client, done);
        });
    }
};