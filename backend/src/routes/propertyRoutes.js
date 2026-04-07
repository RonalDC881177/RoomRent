const express = require('express');
const router = express.Router();

const { createProperty } = require('../controllers/propertyController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, createProperty);

module.exports = router;