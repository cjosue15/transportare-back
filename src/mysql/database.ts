import { createPool } from 'mysql2/promise';

export async function createConnection() {
    try {
        const conn = await createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT),
            connectionLimit: 10,
        });

        return conn;
    } catch (error) {
        console.log(error);
    }
}

// module.exports = { createConnection };
