const express = require('express');
const db = require('./db');
const router = express.Router();

router.get('/toys', async (req, res) => {
  const toys = await db('toys');
  res.json(toys);
});

router.get('/toys/brand/:brand', async (req, res) => {
  const { brand } = req.params;
  const toys = await db('toys').where('brand', brand);
  res.json(toys);
});

module.exports = router;
