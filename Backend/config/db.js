const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'medicine_info',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Enable SSL if required (e.g., for AWS RDS)
if (process.env.DB_SSL === 'true') {
    dbConfig.ssl = {
        rejectUnauthorized: false // Set to false to allow AWS RDS self-signed certificates
    };
}

const pool = mysql.createPool(dbConfig);

module.exports = pool;
