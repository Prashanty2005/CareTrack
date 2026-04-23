require('dotenv').config();
const mysql = require('mysql2/promise');

async function test() {
    console.log("DB_PASSWORD is:", process.env.DB_PASSWORD);
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        console.log("Connection successful!");
        await connection.end();
    } catch (e) {
        console.error("Connection failed:", e.message);
    }
}

test();
