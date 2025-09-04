const express = require('express');
const mysql = require('mysql2');
const AWS = require('aws-sdk');
const cors = require('cors');
const nodemailer = require('nodemailer'); 
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

// --- MySQL setup ---
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect(err => {
    if (err) console.error('DB connection error:', err);
    else console.log('Connected to MySQL');
});

// --- AWS S3 setup ---
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// --- Helper to generate signed URLs ---
const getSignedUrl = (key) => {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        Expires: 60 * 60 * 24 * 3,
    };
    return s3.getSignedUrl('getObject', params);
};

// --- API route to fetch toys ---
app.get('/api/toys', (req, res) => {
    const { category, status, columns } = req.query;
    let selectCols = '*';

    if (columns) {
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

        const toysWithUrls = results.map(toy => {
            if (toy.image) return { ...toy, imageUrl: getSignedUrl(toy.image) };

            return toy;
        });
        

        res.json(toysWithUrls);
    });
});

// --- API route to handle support form ---
app.post('/api/support', async (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message)
        return res.status(400).json({ message: 'All fields are required' });

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: process.env.SUPPORT_EMAIL,
            subject: `[Support Form] ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Email could not be sent' });
    }
});


// --- Start server ---
app.listen(port, () => console.log(`Server running on port ${port}`));
