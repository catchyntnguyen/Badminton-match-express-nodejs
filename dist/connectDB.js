const mysql = require('mysql2/promise');
const fs = require('fs').promises;

async function connectToDatabase() {
    try {
        const pool = await mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'thi',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        return pool;
    } catch (e) {
        console.log('Error creating connection to mysql: ' + e.message);
        return null;
    }
}

async function CreateHomeJsonFile() {
    try {
        const pool = await connectToDatabase();
        const connection = await pool.getConnection();
        const [newRows, fields] = await connection.query('SELECT * FROM products where idCategory = 1');
        const [newRows2, fields2] = await connection.query('SELECT * FROM products where idCategory = 2');
        const homeData = {
            trongnuoc: newRows,
            ngoainuoc: newRows2,
        }
        const jsonData = JSON.stringify(homeData, null, 2);
        await fs.writeFile('config/trangchu.json', jsonData);
        console.log('Home JSON created successfully');
        connection.release();
        pool.end();
    } catch (e) {
        console.log('Error creating Home JSON file: ' + e.message);
        throw e;
    }
}
async function run() {
    await CreateHomeJsonFile();
}
run();