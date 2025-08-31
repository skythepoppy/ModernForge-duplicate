// server/createTable.js
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect();

const createTableQuery = `
CREATE TABLE IF NOT EXISTS CarToys (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image VARCHAR(255),
  brand VARCHAR(100),
  title VARCHAR(255),
  description TEXT,
  price DECIMAL(10,2),
  quantity INT,
  discountedPrice DECIMAL(10,2)
)
`;

connection.query(createTableQuery, (err, result) => {
  if (err) {
    console.error('Error creating table:', err);
    return;
  }
  console.log('Toys table created or already exists.');
  connection.end();
});
