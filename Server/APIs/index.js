const express = require('express')
const router = express.Router();


const course = require('./course')
router.use('/course',course);

const content = require('./content')
router.use('/content',content)

const purchase = require('./purchase')
router.use('/purchase',purchase)

module.exports = router;