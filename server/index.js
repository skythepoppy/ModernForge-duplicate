const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');  // Import cors
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5050;


app.use(cors());  // Allow all origins by default

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect(err => {
    if (err) {
        console.error('DB connection error:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.get('/api/toys', (req, res) => {
    connection.query('SELECT * FROM toys', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }
        res.json(results);
    });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

