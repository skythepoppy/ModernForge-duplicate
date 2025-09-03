const express = require('express');
const mysql = require('mysql2');
const AWS = require('aws-sdk');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5050;

app.use(cors()); // Allow all origins for now (lock down later if needed)
app.use(express.json());

// MySQL connection
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

// AWS S3 setup
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// Helper to generate signed URL
const getSignedUrl = (key) => {

    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        Expires: 60 * 60 * 24 * 3,
    };
    return s3.getSignedUrl('getObject', params);
};


// API route to fetch toys with signed image URLs
app.get('/api/toys', (req, res) => {
    const { category, status, columns } = req.query;

    // Default to all columns if none specified
    let selectCols = '*';
    if (columns) {
        // Validate columns to prevent SQL injection
        const allowedCols = ['id', 'brand', 'title', 'description', 'price', 'discountedPrice', 'quantity', 'image', 'category', 'status'];
        const requestedCols = columns.split(',').filter(col => allowedCols.includes(col));
        if (requestedCols.length) selectCols = requestedCols.join(',');
    }

    let sql = `SELECT ${selectCols} FROM toys`;
    const params = [];
    const conditions = [];

    if (category) { conditions.push('category = ?'); params.push(category); }
    if (status) { conditions.push('status = ?'); params.push(status); }
    if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
    

    


    connection.query(sql, params, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query error' });

        // Only attach image URLs if the column 'image' is selected
        const toysWithUrls = results.map(toy => {
            if (toy.image) return { ...toy, imageUrl: getSignedUrl(toy.image) };
            return toy;
        });

        res.json(toysWithUrls);
    });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
