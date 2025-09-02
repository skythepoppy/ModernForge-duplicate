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
        Bucket: process.env.AWS_S3_BUCKET, // store bucket name in .env
        Key: key,
        Expires: 60 * 5, // 5 minutes expiration
    };
    return s3.getSignedUrl('getObject', params);
};

// API route to fetch toys with signed image URLs
app.get('/api/toys', (req, res) => {
    connection.query('SELECT * FROM toys', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }

        // Attach signed URLs to each toy's image field
        const toysWithUrls = results.map(toy => {
            if (toy.image) { 
                return {
                    ...toy,
                    imageUrl: getSignedUrl(toy.image),
                };
            }
            return toy;
        });

        res.json(toysWithUrls);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
